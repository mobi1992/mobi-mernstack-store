import { UNKNOWN_USER_DECREMENT_CART_REQUEST, UNKNOWN_USER_DECREMENT_CART_SUCCESS, UNKNOWN_USER_DECREMENT_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/unknownUserCartConstants";


export const decrementQtyReducerUnk = (state = { decrementQtyUnknownUser: {} }, action) => {
    switch (action.type) {
        case UNKNOWN_USER_DECREMENT_CART_REQUEST:
            return {
                loading: true,
                decrementQtyUnknownUser : null
            }
        case UNKNOWN_USER_DECREMENT_CART_SUCCESS:
            return {
                loading: false,
                decrementQtyUnknownUser : action.payload
            }
        case UNKNOWN_USER_DECREMENT_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                decrementQtyUnknownUser : null,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}