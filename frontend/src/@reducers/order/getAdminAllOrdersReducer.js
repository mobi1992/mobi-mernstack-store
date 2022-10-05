import { ADMIN_GET_ALL_ORDERS_REQUEST, ADMIN_GET_ALL_ORDERS_SUCCESS, ADMIN_GET_ALL_ORDERS_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const getAdminAllOrdersReducer = (state = { adminAllOrders: {} }, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_ORDERS_REQUEST:
            return {
                adminAllOrdersLoading: true,
                adminAllOrders : null,
                adminAllOrdersSuccess : null
            }
        case ADMIN_GET_ALL_ORDERS_SUCCESS:
            return {
                adminAllOrdersLoading: false,
                adminAllOrders : action.payload,
                adminAllOrdersSuccess : action.payload.success,
                adminAllOrdersResultPerPage : action.payload.resultPerPage,
                adminAllOrdersCount : action.payload.ordersCount,
                adminAllOrdersTotalAmount : action.payload.totalAmount,
                adminAllOrdersTodayTotalAmount : action.payload.todayTotalAmount
            }
        case ADMIN_GET_ALL_ORDERS_FAILURE:
            return {
                adminAllOrdersLoading: false,
                adminAllOrdersError: action.payload,
                adminAllOrders : null,
                adminAllOrdersSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                adminAllOrdersError : null
            }
        default:
            return state
    }
}
