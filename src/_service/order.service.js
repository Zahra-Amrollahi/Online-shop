import { TIMEOUT_DELAY, HOST, ADMIN_USERNAME, ADMIN_PASSWORD } from "../_constants";

export const orderService = {
    createOrder
}
function createOrder(order) {
    debugger
    console.log("calling orderService createOrder  ")
    
    
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
                return (fetch(`${HOST}/wp-json/wc/v3/orders`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('admin_Token'),
                    },
                    body: JSON.stringify( order)

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

