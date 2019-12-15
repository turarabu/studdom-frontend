export default { install }

const events = {
    focus: {},
    blur: {}
}

const data = {
    focused: {},
    signed: {}
}

function install (Vue) {
    Vue.prototype.addEventListener = addEventListener(Vue)

    document.addEventListener('click', (event, ...args) => {
        // Handle blur event
        Object.keys(data.focused).forEach(id => {
            Object.values(events.blur).forEach(listener => {
                if ( id === listener.id ) {
                    let inFocus = event.path.find(e => e === listener.el)
                    if ( inFocus === undefined ) {
                        listener.callback(event, ...args)
                        delete data.focused[id]
                    } 
                }
            })
        })

        // Handle focus event
        Object.values(event.path).forEach(el => {
            let find = Object.values(events.focus).find(l => l.el === el)
            if ( find !== undefined ) {
                if ( data.focused[find.id] === undefined ) {
                    find.callback(event, ...args)
                    data.focused[find.id] = find
                }
            }
        })

        
    })
}

function addEventListener (Vue) {
    var id = Math.random().toString(36)

    return function (event, callback) {
        if ( events[event] === undefined )
            return
        
        data.signed[id] = true
        Vue.mixin({
            beforeDestroy: destroyEvents(id)
        })

        events[event][id] = {
            id, callback,
            el: this.$el
        }
    }
}

function destroyEvents (id) {
    return () => {
        if ( data.signed[id] !== undefined ) {
            delete data.signed[id]
            Object.keys(events).forEach(event => {
                if ( events[event][id] !== false ) {
                    delete events[event][id]
                }
            })
        }
    }
}