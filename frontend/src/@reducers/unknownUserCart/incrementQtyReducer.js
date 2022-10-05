import { UNKNOWN_USER_INCREMENT_CART_REQUEST, UNKNOWN_USER_INCREMENT_CART_SUCCESS, UNKNOWN_USER_INCREMENT_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/unknownUserCartConstants";


export const incrementQtyReducerUnk = (state = { incrementQtyUnknownUser: {} }, action) => {
    switch (action.type) {
        case UNKNOWN_USER_INCREMENT_CART_REQUEST:
            return {
                loading: true,
                incrementQtyUnknownUser : null
            }
        case UNKNOWN_USER_INCREMENT_CART_SUCCESS:
            return {
                loading: false,
                incrementQtyUnknownUser : action.payload
            }
        case UNKNOWN_USER_INCREMENT_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                incrementQtyUnknownUser : null,
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