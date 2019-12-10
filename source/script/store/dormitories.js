export default {
    state: {
        list: {}
    },

    mutations: {
        'dormitories-set': set,
        'dormitory-turnstiles-set': turnstiles
    }
}

function set (state, data) {
    state.list = data
}

function turnstiles  (state, data) {
    state.list[ data.dormitory ] = data.turnstiles
}