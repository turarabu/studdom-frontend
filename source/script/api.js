export default { install }

const host = 'localhost'
const port = 8000

function install (Vue) {
    Vue.prototype.api = { get, post }
}

function get (path, data = {}) {
    var query = getQuery(data)

    return new Promise(async resolve => {
        var request = await fetch(`http://${host}:${port}/${path}?${query}`)
        var response = await request.json()

        resolve({
            status: request.status,
            headers: request.headers,

            data: response.data,
            error: response.error,
            success: response.success
        })
    })
}

function post (path, data = {}) {
    var body = getFormData(data)

    return new Promise(async resolve => {
        var request = await fetch(`http://${host}:${port}/${path}`, {
            body,
            method: 'POST'
        })

        var response = await request.json()

        resolve({
            status: request.status,
            headers: request.headers,

            data: response.data,
            error: response.error,
            success: response.success
        })
    })
}

function getQuery (data) {
    var result = []

    Object.keys(data).forEach(key => {
        result.push(`${key}=${data[ key ]}`)
    })

    return result.join('&')
}

function getFormData (data) {
    var form = new FormData()

    Object.keys(data).forEach(key => {
        form.append(key, data[key])
    })

    return form


}