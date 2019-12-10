export default {
    state: {
        status: true,
        data: {}
    },
    mutations: {
        'user-set': set,
        'user-quit': quit
    }
}

function set (state, user) {
    state.status = true
    state.data = user
}

function quit (state) {
    state.status = false
    state.data = {}
}