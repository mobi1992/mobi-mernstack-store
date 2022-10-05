import { LOGGEDIN_USER_INCREMENT_CART_REQUEST, LOGGEDIN_USER_INCREMENT_CART_SUCCESS, LOGGEDIN_USER_INCREMENT_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const incrementQtyReducerLoggedin = (state = { incrementQtyLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_INCREMENT_CART_REQUEST:
            return {
                loading: true,
                incrementQtyLoggedinUser : null
            }
        case LOGGEDIN_USER_INCREMENT_CART_SUCCESS:
            return {
                loading: false,
                incrementQtyLoggedinUser : action.payload
            }
        case LOGGEDIN_USER_INCREMENT_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                incrementQtyLoggedinUser : null,
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