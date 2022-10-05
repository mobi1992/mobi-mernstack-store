import { GET_ORDER_WITH_ORDER_ID_UA_REQUEST, GET_ORDER_WITH_ORDER_ID_UA_SUCCESS, GET_ORDER_WITH_ORDER_ID_UA_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const getOrderUnkWithOrderIdReducer = (state = { getOrderUnkWithOrderId: {} }, action) => {
    switch (action.type) {
        case GET_ORDER_WITH_ORDER_ID_UA_REQUEST:
            return {
                getOrderUnkWithOrderIdLoading: true,
                getOrderUnkWithOrderId : null,
                getOrderUnkWithOrderIdSuccess : null
            }
        case GET_ORDER_WITH_ORDER_ID_UA_SUCCESS:
            return {
                getOrderUnkWithOrderIdLoading: false,
                getOrderUnkWithOrderId : action.payload,
                getOrderUnkWithOrderIdSuccess : action.payload.success
            }
        case GET_ORDER_WITH_ORDER_ID_UA_FAILURE:
            return {
                getOrderUnkWithOrderIdLoading: false,
                getOrderUnkWithOrderIdError: action.payload,
                getOrderUnkWithOrderId : null,
                getOrderUnkWithOrderIdSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                getOrderUnkWithOrderIdError : null
            }
        default:
            return state
    }
}
