import { DELETE_PRODUCT_CATEGORY_REQUEST, DELETE_PRODUCT_CATEGORY_SUCCESS, DELETE_PRODUCT_CATEGORY_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const deleteProductCategoryReducer = (state = { deleteProdCategory: [] }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_CATEGORY_REQUEST:
            return {
                loading: true,
                deleteProdCategory : null,
                deleteProdCategorySuccess : null
            }
        case DELETE_PRODUCT_CATEGORY_SUCCESS:
            return {
                loading: false,
                deleteProdCategory : action.payload,
                deleteProdCategorySuccess : action.payload.success
            }
        case DELETE_PRODUCT_CATEGORY_FAILURE:
            return {
                loading: false,
                deleteProdCategoryError: action.payload.data.error,
                deleteProdCategory : null,
                deleteProdCategorySuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deleteProdCategoryError: null
            }
        default:
            return state
    }
}