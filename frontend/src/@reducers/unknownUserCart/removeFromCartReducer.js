import { UNKNOWN_USER_REMOVE_ITEM_CART_REQUEST, UNKNOWN_USER_REMOVE_ITEM_CART_SUCCESS, UNKNOWN_USER_REMOVE_ITEM_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/unknownUserCartConstants";


export const removeFromCartReducerUnk = (state = { removeFromCartUnknownUser: {} }, action) => {
    switch (action.type) {
        case UNKNOWN_USER_REMOVE_ITEM_CART_REQUEST:
            return {
                loadingRemoveFromCart: true,
                removeFromCartUnknownUser : null
            }
        case UNKNOWN_USER_REMOVE_ITEM_CART_SUCCESS:
            return {
                loadingRemoveFromCart: false,
                removeFromCartUnknownUser : action.payload
            }
        case UNKNOWN_USER_REMOVE_ITEM_CART_FAILURE:
            return {
                loadingRemoveFromCart: false,
                error: action.payload,
                removeFromCartUnknownUser : null,
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