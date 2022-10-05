import { GET_LOGGEDIN_USER_SINGLE_ORDER_REQUEST, GET_LOGGEDIN_USER_SINGLE_ORDER_SUCCESS, GET_LOGGEDIN_USER_SINGLE_ORDER_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const getSingleOrderLoggedinUserReducer = (state = { getSingleOrderLoggedinUser: {} }, action) => {
    switch (action.type) {
        case GET_LOGGEDIN_USER_SINGLE_ORDER_REQUEST:
            return {
                getSingleOrderLoggedinUserLoading: true,
                getSingleOrderLoggedinUser : null,
                getSingleOrderLoggedinUserSuccess : null
            }
        case GET_LOGGEDIN_USER_SINGLE_ORDER_SUCCESS:
            return {
                getSingleOrderLoggedinUserLoading: false,
                getSingleOrderLoggedinUser : action.payload,
                getSingleOrderLoggedinUserSuccess : action.payload.success
            }
        case GET_LOGGEDIN_USER_SINGLE_ORDER_FAILURE:
            return {
                getSingleOrderLoggedinUserLoading: false,
                getSingleOrderLoggedinUserError: action.payload,
                getSingleOrderLoggedinUser : null,
                getSingleOrderLoggedinUserSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                getSingleOrderLoggedinUserError : null
            }
        default:
            return state
    }
}
