import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const updateProfileReducer = (state = { updatedUser: {} }, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
                updatedUser : null
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                updatedUser : action.payload,
                isAuthenticated : true
            }
        case UPDATE_PROFILE_FAILURE:
            return {
                loading: false,
                error: action.payload,
                updatedUser : null,
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