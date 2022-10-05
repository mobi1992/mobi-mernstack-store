import { PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                productSuccess : action.payload.success
            }
        case PRODUCT_DETAIL_FAILURE:
            return {
                loading: false,
                productError: action.payload.data.error,
                code : action.payload.status,
                product : {}
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