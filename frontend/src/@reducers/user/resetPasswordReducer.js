import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const resetPasswordReducer = (state = { resetPassword: {} }, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                resetPassword : null
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                resetPassword : action.payload,
                isAuthenticated : true
            }
        case RESET_PASSWORD_FAILURE:
            return {
                loading: false,
                error: action.payload,
                resetPassword : null,
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