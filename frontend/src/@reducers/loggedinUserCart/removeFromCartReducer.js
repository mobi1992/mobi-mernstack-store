import { LOGGEDIN_USER_REMOVE_ITEM_CART_REQUEST, LOGGEDIN_USER_REMOVE_ITEM_CART_SUCCESS, LOGGEDIN_USER_REMOVE_ITEM_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const removeFromCartReducerLoggedin = (state = { removeFromCartLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_REMOVE_ITEM_CART_REQUEST:
            return {
                loading: true,
                removeFromCartLoggedinUser : null
            }
        case LOGGEDIN_USER_REMOVE_ITEM_CART_SUCCESS:
            return {
                loading: false,
                removeFromCartLoggedinUser : action.payload
            }
        case LOGGEDIN_USER_REMOVE_ITEM_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                removeFromCartLoggedinUser : null,
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