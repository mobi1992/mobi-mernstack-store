import { UNKNOWN_USER_EMPTY_CART_REQUEST, UNKNOWN_USER_EMPTY_CART_SUCCESS, UNKNOWN_USER_EMPTY_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/unknownUserCartConstants";


export const emptyCartReducerUnk = (state = { emptyCartUnknownUser: {} }, action) => {
    switch (action.type) {
        case UNKNOWN_USER_EMPTY_CART_REQUEST:
            return {
                loadingEmptyCart: true,
                emptyCartUnknownUser : null
            }
        case UNKNOWN_USER_EMPTY_CART_SUCCESS:
            return {
                loadingEmptyCart: false,
                emptyCartUnknownUser : action.payload
            }
        case UNKNOWN_USER_EMPTY_CART_FAILURE:
            return {
                loadingEmptyCart: false,
                error: action.payload,
                emptyCartUnknownUser : null,
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