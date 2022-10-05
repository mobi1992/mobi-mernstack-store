import { ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage : action.payload.resultPerPage,
                searchedProductsCount : action.payload.searchedProductsCount
            }
        case ALL_PRODUCT_FAILURE:
            return {
                loading: false,
                error: action.payload.data.error,
                code : action.payload.status,
                products : []
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