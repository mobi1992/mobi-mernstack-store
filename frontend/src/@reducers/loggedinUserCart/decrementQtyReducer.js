import { LOGGEDIN_USER_DECREMENT_CART_REQUEST, LOGGEDIN_USER_DECREMENT_CART_SUCCESS, LOGGEDIN_USER_DECREMENT_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const decrementQtyReducerLoggedin = (state = { decrementQtyLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_DECREMENT_CART_REQUEST:
            return {
                loading: true,
                decrementQtyLoggedinUser : null
            }
        case LOGGEDIN_USER_DECREMENT_CART_SUCCESS:
            return {
                loading: false,
                decrementQtyLoggedinUser : action.payload
            }
        case LOGGEDIN_USER_DECREMENT_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                decrementQtyLoggedinUser : null,
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