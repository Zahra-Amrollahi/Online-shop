import { TIMEOUT_DELAY, HOST, ADMIN_USERNAME, ADMIN_PASSWORD } from "../_constants";

export const productService = {
    getAll, getById, getAllByCategoryId
}
function getAll() {

    console.log("calling ProductService GetAll  ")
    return (
        fetch(`${HOST}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',

            headers: {
                // 'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
        })
            .then((response) => {
                debugger
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                const { token } = data;
                localStorage.setItem('admin_Token', data.token);

            })
           
           
            .then(() => {
                return (fetch(`${HOST}/wp-json/wc/v3/products`, {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('admin_Token'),
                    },
                    // body: JSON.stringify({ email, password })
                })

                )
            }
            ))

    // const requestOptions = {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' }
    // };

    // return fetch(`${HOST}/wp-json/wc/v3/products`, requestOptions)
    //     .then(handleResponse);
}

function getAllByCategoryId(categoryId) {

    console.log("calling ProductService GetAllByCategoryId  ")
    return (
        fetch(`${HOST}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',

            headers: {
                // 'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
        })
            .then((response) => {
                debugger
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                const { token } = data;
                localStorage.setItem('admin_Token', data.token);

            })
           
           
            .then(() => {
                return (fetch(`${HOST}/wp-json/wc/v3/products?category=${categoryId}`, {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('admin_Token'),
                    },
                    // body: JSON.stringify({ email, password })
                })

                )
            }
            ))

    // const requestOptions = {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' }
    // };

    // return fetch(`${HOST}/wp-json/wc/v3/products`, requestOptions)
    //     .then(handleResponse);
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