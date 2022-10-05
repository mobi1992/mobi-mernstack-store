import { UNKNOWN_USER_GET_CART_REQUEST, UNKNOWN_USER_GET_CART_SUCCESS, UNKNOWN_USER_GET_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/unknownUserCartConstants";


export const getCartItemsReducerUnk = (state = { getCartItemsUnknownUser: {} }, action) => {
    switch (action.type) {
        case UNKNOWN_USER_GET_CART_REQUEST:
            return {
                loading: true,
                getCartItemsUnknownUser : null
            }
        case UNKNOWN_USER_GET_CART_SUCCESS:
            return {
                loading: false,
                getCartItemsUnknownUser : action.payload,
                getCartItemsUnknownUserSuccess : action.payload.success
            }
        case UNKNOWN_USER_GET_CART_FAILURE:
            return {
                loading: false,
                getCartItemsUnknownUserError: action.payload,
                getCartItemsUnknownUser : null,
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