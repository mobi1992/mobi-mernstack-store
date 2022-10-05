import { LOGGEDIN_USER_ADD_TO_CART_REQUEST, LOGGEDIN_USER_ADD_TO_CART_SUCCESS, LOGGEDIN_USER_ADD_TO_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/loggedinUserCartConstants";


export const addToCartReducerLoggedin = (state = { addToCartLoggedinUser: {} }, action) => {
    switch (action.type) {
        case LOGGEDIN_USER_ADD_TO_CART_REQUEST:
            return {
                addToCartLoggedinUserLoading: true,
                addToCartLoggedinUser : null
            }
        case LOGGEDIN_USER_ADD_TO_CART_SUCCESS:
            return {
                addToCartLoggedinUserLoading: false,
                addToCartLoggedinUser : action.payload
            }
        case LOGGEDIN_USER_ADD_TO_CART_FAILURE:
            return {
                addToCartLoggedinUserLoading: false,
                addToCartLoggedinUserError: action.payload,
                addToCartLoggedinUser : null,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                addToCartLoggedinUserError: null
            }
        default:
            return state
    }
}