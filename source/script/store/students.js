export default {
    state: {
        loaded: false,
        list: []
    },

    mutations: {
        'students-add': add,
        'students-set': set,
        'students-loaded': (state, value) => state.loaded = value,

        'student-update': update
    }
}

function add (state, data) {
    var old = JSON.parse( JSON.stringify(state.list) )

    Object.keys(data).forEach(id => {
        if ( old[id] === undefined )
            old[id] = data[id]
    })

    state.list = old
}

function set (state, data) {
    state.list = data
}

function update (state, data) {
    var index = state.list.findIndex(student => {
        return student.iin === data.iin
    })

    Object.assign(state.list[index], data.assign)
    state.list = [...state.list]

    console.log(state.list)
}