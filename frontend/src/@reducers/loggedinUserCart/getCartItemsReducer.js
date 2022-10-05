import { LOGGEDIN_USER_GET_CART_REQUEST, LOGGEDIN_USER_GET_CART_SUCCESS, LOGGEDIN_USER_GET_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const getCartItemsReducerLoggedin = (state = { getCartItemsLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_GET_CART_REQUEST:
            return {
                loading: true,
                getCartItemsLoggedinUser : null
            }
        case LOGGEDIN_USER_GET_CART_SUCCESS:
            return {
                loading: false,
                getCartItemsLoggedinUser : action.payload,
                getCartItemsLoggedinUserSuccess : action.payload.success
            }
        case LOGGEDIN_USER_GET_CART_FAILURE:
            return {
                loading: false,
                getCartItemsLoggedinUserError: action.payload,
                getCartItemsLoggedinUser : null,
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