export default { install }

const host = 'api.studdom.host'
const port = 443

// const host = 'localhost'
// const port = 8000

function install (Vue) {
    Vue.prototype.api = { get, post }
}

function get (path, data = {}) {
    var query = getQuery(data)
    var response = request(`https://${host}:${port}/${path}?${query}`, {
        method: 'GET'
    })

    return typeResponse(response)
}

function post (path, data = {}) {
    var body = getFormData(data)
    var response = request(`https://${host}:${port}/${path}`, {
        body,
        method: 'POST'
    })

    return typeResponse(response)
}

function request (url, options) {
    return fetch(url, Object.assign(options, {
        credentials: 'include'
    }))
}

function typeResponse (request) {
    return new Promise(async resolve => {
        var response = await request
        var json = await response.json()

        resolve({
            status: response.status,
            headers: response.headers,

            data: json.data,
            error: json.error,
            success: json.success
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