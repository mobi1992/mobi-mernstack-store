import { ADMIN_DELETE_PRODUCT_REVIEW_REQUEST, ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS, ADMIN_DELETE_PRODUCT_REVIEW_FAILURE, CLEAR_ERRORS } from "../../@constants/productConstants"

export const adminDeleteProductReviewReducer = (state = { deletedProductReview: [] }, action) => {
    switch (action.type) {
        case ADMIN_DELETE_PRODUCT_REVIEW_REQUEST:
            return {
                loading: true,
                deletedProductReview : null,
                deletedProductReviewSuccess : null
            }
        case ADMIN_DELETE_PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                deletedProductReview : action.payload,
                deletedProductReviewSuccess : action.payload.success
            }
        case ADMIN_DELETE_PRODUCT_REVIEW_FAILURE:
            return {
                loading: false,
                deletedProductReviewError: action.payload.data.error,
                deletedProductReview : null,
                deletedProductReviewSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                deletedProductReviewError: null
            }
        default:
            return state
    }
}