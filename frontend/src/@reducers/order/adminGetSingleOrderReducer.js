import { ADMIN_GET_SINGLE_ORDER_REQUEST, ADMIN_GET_SINGLE_ORDER_SUCCESS, ADMIN_GET_SINGLE_ORDER_FAILURE, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const adminGetSingleOrderReducer = (state = { singleOrderAdmin: {} }, action) => {
    switch (action.type) {
        case ADMIN_GET_SINGLE_ORDER_REQUEST:
            return {
                singleOrderAdminLoading: true,
                singleOrderAdmin : null,
                singleOrderAdminSuccess : null
            }
        case ADMIN_GET_SINGLE_ORDER_SUCCESS:
            return {
                singleOrderAdminLoading: false,
                singleOrderAdmin : action.payload,
                singleOrderAdminSuccess : action.payload.success
            }
        case ADMIN_GET_SINGLE_ORDER_FAILURE:
            return {
                singleOrderAdminLoading: false,
                singleOrderAdminError: action.payload,
                singleOrderAdmin : null,
                singleOrderAdminSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                singleOrderAdminError : null
            }
        default:
            return state
    }
}
