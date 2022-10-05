import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const adminDeleteUserReducer = (state = { deletedUser: {} }, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                deletedUserLoading: true,
                deletedUser : null,
                
            }
        case DELETE_USER_SUCCESS:
            return {
                deletedUserLoading: false,
                deletedUser : action.payload,
                isAuthenticated : true,
                deletedUserSuccess : true,
                deletedUserCount : action.payload.usersCount,
                deletedUserResultPerPage : action.payload.resultPerPage
            }
        case DELETE_USER_FAILURE:
            return {
                deletedUserLoading: false,
                deletedUserError: action.payload,
                deletedUser : null,
                isAuthenticated : false,
                
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deletedUserError: null
            }
        default:
            return state
    }
}