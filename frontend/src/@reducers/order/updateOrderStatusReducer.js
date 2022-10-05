import { UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const updateOrderStatusReducer = (state = { orderStatus: {} }, action) => {
    switch (action.type) {
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                orderStatusLoading: true,
                orderStatus : null,
                orderStatusSuccess : null
            }
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                orderStatusLoading: false,
                orderStatus : action.payload,
                orderStatusSuccess : action.payload.success
            }
        case UPDATE_ORDER_STATUS_FAILURE:
            return {
                orderStatusLoading: false,
                orderStatusError: action.payload,
                orderStatus : null,
                orderStatusSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                orderStatusError : null
            }
        default:
            return state
    }
}
