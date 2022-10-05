import {CATEGORY_ITEMS_REQUEST, CATEGORY_ITEMS_SUCCESS, CATEGORY_ITEMS_FAILURE, CLEAR_ERRORS} from '../../@constants/categoryConstants'

export const categoryItemsReducer = (state = {categoryProducts : []}, action) => {
    switch (action.type) {
        case CATEGORY_ITEMS_REQUEST:
            return {
                loading : true,
                categoryProducts : []
            }
        case CATEGORY_ITEMS_SUCCESS:
            return {
                loading : false,
                categoryProducts : action.payload.products,
                categoryProductsSuccess : action.payload.success,
                resultPerPage : action.payload.resultPerPage,
                productsCount : action.payload.productsCount
            }
        case CATEGORY_ITEMS_FAILURE:
            return {
                loading : false,
                categoryProducts : [],
                error : action.payload.data.error,
                code : action.payload.status
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