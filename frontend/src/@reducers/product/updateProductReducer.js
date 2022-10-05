import { UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const updateProductReducer = (state = { updateProduct: [] }, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                updateProductLoading: true,
                updateProduct : null,
                updateProductSuccess : null
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                updateProductLoading: false,
                updateProduct : action.payload.product,
                updateProductSuccess : action.payload.success
            }
        case UPDATE_PRODUCT_FAILURE:
            return {
                updateProductLoading: false,
                updateProductError: action.payload.data.error,
                updateProduct : null,
                updateProductSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                updateProductError: null
            }
        default:
            return state
    }
}