import { LOGGEDIN_USER_EMPTY_CART_REQUEST, LOGGEDIN_USER_EMPTY_CART_SUCCESS, LOGGEDIN_USER_EMPTY_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const emptyCartReducerLoggedin = (state = { emptyCartLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_EMPTY_CART_REQUEST:
            return {
                loading: true,
                emptyCartLoggedinUser : null
            }
        case LOGGEDIN_USER_EMPTY_CART_SUCCESS:
            return {
                loading: false,
                emptyCartLoggedinUser : action.payload
            }
        case LOGGEDIN_USER_EMPTY_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                emptyCartLoggedinUser : null,
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