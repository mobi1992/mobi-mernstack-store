import { USER_DETAILS_REQUEST, USER_DETAILS_FAILURE, USER_DETAILS_SUCCESS, CLEAR_ERRORS } from "../../@constants/userConstants";

export const userDetailsReducer = (state = { userDetails: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                loading: true,
                userDetails : null,
                isAdmin : null
            }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userDetails : action.payload,
                isAuthenticated : true,
                isAdmin : action.payload.isAdmin
            }
        case USER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload,
                userDetails : null,
                isAuthenticated : false,
                isAdmin : null
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