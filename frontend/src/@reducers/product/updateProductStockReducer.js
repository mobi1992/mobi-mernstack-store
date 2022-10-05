import { UPDATE_PRODUCT_STOCK_REQUEST, UPDATE_PRODUCT_STOCK_SUCCESS, UPDATE_PRODUCT_STOCK_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const updateProductStockReducer = (state = { updateProductStk: {} }, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_STOCK_REQUEST:
            return {
                loading: true,
                ...state
            }
        case UPDATE_PRODUCT_STOCK_SUCCESS:
            return {
                loading: false,
                updateProductStk: action.payload.product,
            }
        case UPDATE_PRODUCT_STOCK_FAILURE:
            return {
                loading: false,
                error: action.payload.data.error,
                updateProductStk : {}
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