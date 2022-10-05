import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const updatePasswordReducer = (state = { updatedPassword: {} }, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true,
                updatedPassword : null
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                loading: false,
                updatedPassword : action.payload,
                isAuthenticated : true
            }
        case UPDATE_PASSWORD_FAILURE:
            return {
                loading: false,
                error: action.payload,
                updatedPassword : null,
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