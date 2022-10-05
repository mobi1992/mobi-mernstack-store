import { CREATE_NEW_ORDER_REQUEST_UNKNOWN_USER, CREATE_NEW_ORDER_SUCCESS_UNKNOWN_USER, CREATE_NEW_ORDER_FAILURE_UNKNOWN_USER, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const createNewOrderUnkReducer = (state = { createNewOrderUnk: {} }, action) => {
    switch (action.type) {
        case CREATE_NEW_ORDER_REQUEST_UNKNOWN_USER:
            return {
                createNewOrderUnkLoading: true,
                createNewOrderUnk : null,
                createNewOrderUnkSuccess : null
            }
        case CREATE_NEW_ORDER_SUCCESS_UNKNOWN_USER:
            return {
                createNewOrderUnkLoading: false,
                createNewOrderUnk : action.payload,
                createNewOrderUnkSuccess : action.payload.success
            }
        case CREATE_NEW_ORDER_FAILURE_UNKNOWN_USER:
            return {
                createNewOrderUnkLoading: false,
                createNewOrderUnkError: action.payload,
                createNewOrderUnk : null,
                createNewOrderUnkSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                createNewOrderUnkError : null
            }
        default:
            return state
    }
}
