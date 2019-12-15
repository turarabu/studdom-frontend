export default {
    state: {
        status: false,
        data: {},
        list: []
    },
    
    mutations: {
        'user-set': set,
        'user-quit': quit,

        'users-list-set': setList
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

function setList (state, list) {
    state.list = list
}