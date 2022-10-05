import { GET_LOGGEDIN_USER_ORDERS_REQUEST, GET_LOGGEDIN_USER_ORDERS_SUCCESS, GET_LOGGEDIN_USER_ORDERS_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const getOrdersLoggedinUserReducer = (state = { getOrdersLoggedinUser: {} }, action) => {
    switch (action.type) {
        case GET_LOGGEDIN_USER_ORDERS_REQUEST:
            return {
                getOrdersLoggedinUserLoading: true,
                getOrdersLoggedinUser : null,
                getOrdersLoggedinUserSuccess : null
            }
        case GET_LOGGEDIN_USER_ORDERS_SUCCESS:
            return {
                getOrdersLoggedinUserLoading: false,
                getOrdersLoggedinUser : action.payload,
                getOrdersLoggedinUserSuccess : action.payload.success,
                getOrdersCountLoggedinUser : action.payload.ordersCount,
                getOrdersLoggedinUserResultPerPage : action.payload.resultPerPage
            }
        case GET_LOGGEDIN_USER_ORDERS_FAILURE:
            return {
                getOrdersLoggedinUserLoading: false,
                getOrdersLoggedinUserError: action.payload,
                getOrdersLoggedinUser : null,
                getOrdersLoggedinUserSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                getOrdersLoggedinUserError : null
            }
        default:
            return state
    }
}
