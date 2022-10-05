import { DELETE_RELATED_PRODUCT_REQUEST, DELETE_RELATED_PRODUCT_SUCCESS, DELETE_RELATED_PRODUCT_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const deleteRelatedProductReducer = (state = { deleteRelatedProd: [] }, action) => {
    switch (action.type) {
        case DELETE_RELATED_PRODUCT_REQUEST:
            return {
                loading: true,
                deleteRelatedProd : null,
                deleteRelatedProdSuccess : null
            }
        case DELETE_RELATED_PRODUCT_SUCCESS:
            return {
                loading: false,
                deleteRelatedProd : action.payload,
                deleteRelatedProdSuccess : action.payload.success
            }
        case DELETE_RELATED_PRODUCT_FAILURE:
            return {
                loading: false,
                deleteRelatedProdError: action.payload.data.error,
                deleteRelatedProd : null,
                deleteRelatedProdSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deleteRelatedProdError: null
            }
        default:
            return state
    }
}