import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const logoutReducer = (state = { logoutUser: {} }, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return {
                loading: true,
                isAuthenticated : true,
                logoutUser : null
            }
        case LOGOUT_SUCCESS:
            return {
                isAuthenticated : false,
                loading: false,
                user : action.payload
            }
        case LOGOUT_FAILURE:
            return {
                loading: false,
                error: action.payload,
                logoutUser : null,
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