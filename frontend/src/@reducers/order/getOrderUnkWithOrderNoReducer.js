import { GET_ORDER_WITH_ORDER_NO_EMAIL_REQUEST, GET_ORDER_WITH_ORDER_NO_EMAIL_SUCCESS, GET_ORDER_WITH_ORDER_NO_EMAIL_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const getOrderUnkWithOrderNoReducer = (state = { getOrderUnkWithOrderNo: {} }, action) => {
    switch (action.type) {
        case GET_ORDER_WITH_ORDER_NO_EMAIL_REQUEST:
            return {
                getOrderUnkWithOrderNoLoading: true,
                getOrderUnkWithOrderNo : null,
                getOrderUnkWithOrderNoSuccess : null
            }
        case GET_ORDER_WITH_ORDER_NO_EMAIL_SUCCESS:
            return {
                getOrderUnkWithOrderNoLoading: false,
                getOrderUnkWithOrderNo : action.payload,
                getOrderUnkWithOrderNoSuccess : action.payload.success
            }
        case GET_ORDER_WITH_ORDER_NO_EMAIL_FAILURE:
            return {
                getOrderUnkWithOrderNoLoading: false,
                getOrderUnkWithOrderNoError: action.payload,
                getOrderUnkWithOrderNo : null,
                getOrderUnkWithOrderNoSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                getOrderUnkWithOrderNoError : null
            }
        default:
            return state
    }
}
