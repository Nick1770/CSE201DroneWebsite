
const apiBaseURL = process.env.REACT_APP_API_BASE_URL

async function callAPI(url, method, data = {}) {
    let info = {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }

    if (method !== 'GET')
        info['body'] = JSON.stringify(data) // body data type must match "Content-Type" header
    
    // Default options are marked with *
    return await fetch(apiBaseURL + url, info);
}

export default callAPI
  