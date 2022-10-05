import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const adminGetAllUserReducer = (state = { allUsers: {} }, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                allUsersLoading: true,
                allUsers : null,
                
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                allUsersLoading: false,
                allUsers : action.payload,
                isAuthenticated : true,
                allUsersSuccess : true,
                allUsersCount : action.payload.usersCount,
                allUsersResultPerPage : action.payload.resultPerPage
            }
        case GET_ALL_USERS_FAILURE:
            return {
                allUsersLoading: false,
                allUsersError: action.payload,
                allUsers : null,
                isAuthenticated : false,
                
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                allUsersError: null
            }
        default:
            return state
    }
}