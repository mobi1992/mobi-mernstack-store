import { FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const forgetPasswordReducer = (state = { forgotPassword: {} }, action) => {
    switch (action.type) {
        case FORGET_PASSWORD_REQUEST:
            return {
                loading: true,
                forgotPassword : null
            }
        case FORGET_PASSWORD_SUCCESS:
            return {
                loading: false,
                forgotPassword : action.payload,
                isAuthenticated : true
            }
        case FORGET_PASSWORD_FAILURE:
            return {
                loading: false,
                error: action.payload,
                forgotPassword : null,
                isAuthenticated : false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}