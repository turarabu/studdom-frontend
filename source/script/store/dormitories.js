export default {
    state: {
        loaded: false,
        list: []
    },

    mutations: {
        'dormitories-set': set,
        'dormitories-update': update,
        'dormitories-loaded': (state, value) => state.loaded = value,

        'dormitory-turnstiles-set': turnstiles
    }
}

function set (state, data) {
    state.list = data
}

function update (state, data) {
    var index = state.list.findIndex(d => d.code === data.code)

    Object.assign(state.list[index], data)
    state.list = [...state.list]
}

function turnstiles  (state, data) {
    state.list[ data.dormitory ] = data.turnstiles
}