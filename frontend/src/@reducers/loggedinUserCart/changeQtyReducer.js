import { LOGGEDIN_USER_CHANGE_QTY_CART_REQUEST, LOGGEDIN_USER_CHANGE_QTY_CART_SUCCESS, LOGGEDIN_USER_CHANGE_QTY_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const changeQtyReducerLoggedin = (state = { changeQtyLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_CHANGE_QTY_CART_REQUEST:
            return {
                loading: true,
                changeQtyLoggedinUser : null
            }
        case LOGGEDIN_USER_CHANGE_QTY_CART_SUCCESS:
            return {
                loading: false,
                changeQtyLoggedinUser : action.payload
            }
        case LOGGEDIN_USER_CHANGE_QTY_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                changeQtyLoggedinUser : null,
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