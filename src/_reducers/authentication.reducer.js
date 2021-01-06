import { authenticationConstants } from "../_constants";
import { authenticationAction } from "../_actions";

const initialState = {
    loginRequest: false, registerRequest: false, user: {}, isAuthenticated: false, redirectTo: '', redirect: false, error: '', customer: {
        status: false
        // shipping:{
        //     address_1: " جنت آباد مرکزی، کوچه شهید توکلی شرقی ، پلاک 14، واحد 8",
        //     address_2: "",
        //     city: "تهران",
        //     company: "سایلکس",
        //     country: "ایران",
        //     first_name: "گلشید",
        //     last_name: "امراللهی",
        //     postcode: "1474853518",
        //     state: "تهران"
        // }

    }
}
export const authentication = (state = initialState, action) => {

    const { type, user, isAuthenticated, error, customer } = action;
    switch (type) {
        case authenticationConstants.LOGIN_REQUEST:
            // debugger
            console.log("authentication reducer LOGIN_REQUEST")
            return { ...state, loginRequest: true };
        case authenticationConstants.LOGIN_SUCCESS:
            //  debugger
            console.log("authentication reducer LOGIN_SUCCESS")
            return { ...state, loginRequest: false, user, isAuthenticated };
        case authenticationConstants.LOGIN_FAILED:
            //  debugger
            console.log("authentication reducer LOGIN_FAILED")
            return { ...state, loginRequest: false, error };
        case authenticationConstants.REGISTER_REQUEST:
            //   debugger
            console.log("registration reducer REGISTER_REQUEST")
            return { ...state, registerRequest: true };
        case authenticationConstants.REGISTER_SUCCESS:
            //   debugger
            console.log("registration reducer REGISTER_SUCCESS")
            return { ...state, registerRequest: false };
        case authenticationConstants.REGISTER_FAILED:
            // debugger
            console.log("registration reducer REGISTER_FAILED")
            return { ...state, registerRequest: false, error };
        case authenticationConstants.LOGOUT_REQUEST:
            debugger
            console.log("authentication reducer LOGOUT");
            return { ...state, user, isAuthenticated }
        case authenticationConstants.RETRIVE_CUSTOMER_REQUEST:
            debugger
            console.log("authentication reducer Retrive Customer request");
            return { ...state };
        case authenticationConstants.RETRIVE_CUSTOMER_SUCCESS:
            debugger
            console.log("authentication reducer Retrive Customer success");
            return { ...state, customer };
        case authenticationConstants.RETRIVE_CUSTOMER_FAILED:
            debugger
            console.log("authentication reducer Retrive Customer failed");
            return { ...state, error };
        case authenticationConstants.UPDATE_CUSTOMER_REQUEST:
            debugger
            console.log("authentication reducer UPDATE Customer request");
            return { ...state };
        case authenticationConstants.UPDATE_CUSTOMER_SUCCESS:
            debugger
            console.log("authentication reducer UPDATE Customer success");
            return { ...state, customer };
        case authenticationConstants.UPDATE_CUSTOMER_FAILED:
            debugger
            console.log("authentication reducer UPDATE Customer failed");
            return { ...state, error };
        case authenticationConstants.SETASLOGEDIN_SEUCCESS:
            return { ...state, user }
        case authenticationConstants.RETRIVE_SHIPPING_REQUEST:
            return { state };
        case authenticationConstants.RETRIVE_SHIPPING_SUCCESS:
            return { ...state, customer };
        case authenticationConstants.UPDATE_SHIPPING_SUCCESS:
            //debugger
            return { ...state, customer }
        default:
            return state;
    }
}

