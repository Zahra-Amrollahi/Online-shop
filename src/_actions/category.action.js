import { categoryConstants } from '../_constants'

import { categoryService } from '../_service';
import { history } from '../_helper/history';
export const categoryAction = {
    getAll
}

function getAll() {
    console.log("calling getAll function of category.action");
    return dispatch => {
        dispatch(request());
        categoryService.getAll()
            .then((response) => {
                debugger
                if (!response.ok && response.status !== 400) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log("data:", data)

                dispatch(success(data));

            })

            .catch((error) => {
                dispatch(failed(error));
            });

    }
    function request() { console.log("calling request function of categirt.action"); return { type: categoryConstants.GETALL_REQUEST }; }
    function success(categories) { console.log("calling success function of categirt.action"); return { type: categoryConstants.GETALL_SUCCESS, categories }; }
    function failed(error) {
        console.log("calling failed function of category.action"); return { type: categoryConstants.GETALL_FAILURE, error }
    }
}

// function getById(id) {
//    // debugger
//     console.log("calling getById function of product.action") ;
//     return dispatch => {
//        // debugger
//         dispatch(request());
//         productService.getById(id).then(
//             product => {
//                // debugger
//                 dispatch(success(product))

//             },
//             error => {
//                // debugger
//                 dispatch(failed(error))
//             }
//         )
//     }
//   function request() {console.log("calling request function of product.action") ;return {type:productConstants.GETBYID_REQUEST};}
//   function success(product) {console.log("calling success function of product.action") ;return {type:productConstants.GETBYID_SUCCESS,product};}
//   function failed(error) {console.log("calling failed function of product.action") ;return {type:productConstants.GETBYID_FAILURE,error}}

// }

