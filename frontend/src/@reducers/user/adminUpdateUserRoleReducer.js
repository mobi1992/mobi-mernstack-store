import { UPDATE_USER_ROLE_REQUEST, UPDATE_USER_ROLE_SUCCESS, UPDATE_USER_ROLE_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const adminUpdateUserRoleReducer = (state = { userRole: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_ROLE_REQUEST:
            return {
                userRoleLoading: true,
                userRole : null,
                
            }
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                userRoleLoading: false,
                userRole : action.payload,
                isAuthenticated : true,
                userRoleSuccess : true,
                userRoleCount : action.payload.usersCount,
                userRoleResultPerPage : action.payload.resultPerPage
            }
        case UPDATE_USER_ROLE_FAILURE:
            return {
                userRoleLoading: false,
                userRoleError: action.payload,
                userRole : null,
                isAuthenticated : false,
                
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                userRoleError: null
            }
        default:
            return state
    }
}