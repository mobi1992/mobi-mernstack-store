import { WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_FAILURE, WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_REQUEST, WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_SUCCESS, CLEAR_ERRORS } from "../../@constants/productConstants";

export const productReviewsUnknownUserReducer = (state = { reviewsUnknownUser: {} }, action) => {
    switch (action.type) {
        case WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_REQUEST:
            return {
                loading: true,
                reviewsUnknownUser: {}
            }
        case WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_SUCCESS:
            return {
                loading: false,
                reviewsUnknownUser : action.payload
            }
        case WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_FAILURE:
            return {
                loading: false,
                error: action.payload.data.error,
                code : action.payload.status,
                reviewsUnknownUser : {}
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