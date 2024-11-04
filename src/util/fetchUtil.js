export const authFetch = (uri, method, body, callback) => {
    const [_, key] = document.cookie.split("=")
    fetch(uri, {
        method: method,
        headers: {
            Authorization: key,
            "Content-Type": "application/json"
        },
        body: body && JSON.stringify(body)
    }).then(async rep => {
        if (callback) {
            callback(rep)
        }
    })
}