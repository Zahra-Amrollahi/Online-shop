import { TIMEOUT_DELAY, HOST, ADMIN_USERNAME, ADMIN_PASSWORD } from "../_constants";


export const authenticationService = {
    login,
    register, 
    retriveCustomer, 
    updateCustomer
}


function login(username, password) {
    debugger
    console.log("calling authenticationServiece Login  ")
    return (
        fetch(`${HOST}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
                // 'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
    )

}

function retriveCustomer(id){

    console.log("calling authenticationService.retriveCustomer");
    debugger
    return (
        fetch(`${HOST}/wp-json/wc/v3/customers/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('admin_Token'),
            },
            
        })
            // .then((response) => {
            //     debugger
            //     if (!response.ok) throw new Error(response.status);
            //     else return response.json();
            // })
            // .then((data) => {
            //     const { token } = data;
            //     localStorage.setItem('admin_Token', data.token);

            // })

            // .then(() => {
            //     return (fetch(`${HOST}/wp-json/wc/v3/customers`, {
            //         method: 'post',
            //         credentials: "include",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Authorization": "Bearer " + localStorage.getItem('admin_Token'),

            //         },
            //         body: JSON.stringify({ email, password })
            //     })

            //     )
        //    }
            //)
            )
}
function updateCustomer(id, data){

    console.log("calling authenticationService.updateCustomer");
    debugger
    return (
        fetch(`${HOST}/wp-json/wc/v3/customers/${id}`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('admin_Token'),
            },
            body: JSON.stringify(data)
           // body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
        })
            // .then((response) => {
            //     debugger
            //     if (!response.ok) throw new Error(response.status);
            //     else return response.json();
            // })
            // .then((data) => {
            //     const { token } = data;
            //     localStorage.setItem('admin_Token', data.token);

            // })

            // .then(() => {
            //     return (fetch(`${HOST}/wp-json/wc/v3/customers`, {
            //         method: 'post',
            //         credentials: "include",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Authorization": "Bearer " + localStorage.getItem('admin_Token'),

            //         },
            //         body: JSON.stringify({ email, password })
            //     })

            //     )
        //    }
            //)
            )
}
function register(email, password) {
    console.log("calling authenticationServiece register  ")

    debugger




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
                return (fetch(`${HOST}/wp-json/wc/v3/customers`, {
                    method: 'post',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('admin_Token'),

                    },
                    body: JSON.stringify({ email, password })
                })

                )
            }
            ))
}
//     console.log("calling authenticationServiece register  ")

//     debugger




//     return (
//         fetch(`${HOST}/wp-json/jwt-auth/v1/token`, {
//             method: 'POST',
//             headers: {
//                 // 'Accept' : 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })
//         })
//             .then((response) => {
//                 debugger
//                 if (!response.ok) throw new Error(response.status);
//                 else return response.json();
//             })
//             .then((data) => {
//                 const { token } = data;
//                 localStorage.setItem('admin_Token', data.token);

//             })

//             .then(() => {
//                 return (
//                     fetch(`${HOST}/wp-json/wc/v3/customers`, {
//                         method: 'POST',
//                         headers: {
//                             // 'Accept' : 'application/json',
//                             'Content-Type': 'application/json'

//                         },
//                         authorization: `Bearer ${localStorage.getItem('admin_Token')}`,
//                         body: JSON.stringify({ email, password })
//                     })
//                 )
//             }
//             )
//     )
// }










