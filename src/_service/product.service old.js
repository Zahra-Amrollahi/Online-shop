import { TIMEOUT_DELAY, HOST, CONSUMER_KEY, CONSUMER_SECRET } from "../_constants";
let base64 = require('base-64');
export const productService = {
    getAll, getById
}
function getAll() {
    //debugger
    console.log("calling ProductService GetAll  ")
    
    let headers = new Headers();

//headers.append('Content-Type', 'text/json');
headers.append('Authorization', 'Basic ' + base64.encode(CONSUMER_KEY + ":" + CONSUMER_SECRET));

// fetch(url, {method:'GET',
        // headers: headers,
        // //credentials: 'user:passwd'
    //    })
   // debugger
    const requestOptions = {
        method: 'GET',
        headers: headers,
        // headers: { 'Content-Type': 'application/json' }
        // headers: new Headers({
            // "Authorization": `Basic ${base64.encode(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
        //   }),
          
    };
   // debugger

    return fetch(`${HOST}/wp-json/wc/v3/products`, requestOptions)
        .then(handleResponse);
}
function getById(id) {
    //debugger
    console.log("calling ProductService getById  ")
   // debugger
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${HOST}/wp-json/wc/v3/products/${id}`, requestOptions)
        .then(handleResponse);
}
function handleResponse(response) {
    console.log("calling productService handleResponse  ")
  //  debugger
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log("error 401")
                
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}