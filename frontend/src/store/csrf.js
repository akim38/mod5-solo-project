import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    //'GET' if there is no method
    options.method = options.method || 'GET';
    //empty object if there is no headers
    options.headers = options.headers || {};

    //if not GET method then header is application/json and xsrf token header is value of the xsrf cookie
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    if (res.status >= 400) throw res;

    return res;
}

//call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
