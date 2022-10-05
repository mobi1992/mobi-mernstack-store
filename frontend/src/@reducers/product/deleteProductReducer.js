import { DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const deleteProductReducer = (state = { deleteProd: [] }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                deleteProdLoading: true,
                deleteProd : null,
                deleteProdSuccess : null
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                deleteProdLoading: false,
                deleteProd : action.payload,
                deleteProdSuccess : action.payload.success
            }
        case DELETE_PRODUCT_FAILURE:
            return {
                deleteProdLoading: false,
                deleteProdError: action.payload.data.error,
                deleteProd : null,
                deleteProdSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deleteProdError: null
            }
        default:
            return state
    }
}