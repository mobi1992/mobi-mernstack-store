import { ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_DELETE_ORDER_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const adminDeleteOrderReducer = (state = { deletedOrder: {} }, action) => {
    switch (action.type) {
        case ADMIN_DELETE_ORDER_REQUEST:
            return {
                deletedOrderLoading: true,
                deletedOrder : null,
                deletedOrderSuccess : null
            }
        case ADMIN_DELETE_ORDER_SUCCESS:
            return {
                deletedOrderLoading: false,
                deletedOrder : action.payload,
                deletedOrderSuccess : action.payload.success
            }
        case ADMIN_DELETE_ORDER_FAILURE:
            return {
                deletedOrderLoading: false,
                deletedOrderError: action.payload,
                deletedOrder : null,
                deletedOrderSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deletedOrderError : null
            }
        default:
            return state
    }
}
