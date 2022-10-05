import { UNKNOWN_USER_CHANGE_QTY_CART_REQUEST, UNKNOWN_USER_CHANGE_QTY_CART_SUCCESS, UNKNOWN_USER_CHANGE_QTY_CART_FAILURE, CLEAR_ERRORS} from "../../@constants/unknownUserCartConstants";


export const changeQtyReducerUnk = (state = { changeQtyUnknownUser: {} }, action) => {
    switch (action.type) {
        case UNKNOWN_USER_CHANGE_QTY_CART_REQUEST:
            return {
                loading: true,
                changeQtyUnknownUser : null
            }
        case UNKNOWN_USER_CHANGE_QTY_CART_SUCCESS:
            return {
                loading: false,
                changeQtyUnknownUser : action.payload
            }
        case UNKNOWN_USER_CHANGE_QTY_CART_FAILURE:
            return {
                loading: false,
                error: action.payload,
                changeQtyUnknownUser : null,
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