import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const signUpReducer = (state = { userSignUp: {} }, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                loading: true,
                isAuthenticated : false,
                userSignUp : null
            }
        case SIGNUP_SUCCESS:
            return {
                isAuthenticated : true,
                loading: false,
                userSignUp : action.payload
            }
        case SIGNUP_FAILURE:
            return {
                loading: false,
                error: action.payload,
                userSignUp : null,
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