import { WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_FAILURE, WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_REQUEST, WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_SUCCESS, CLEAR_ERRORS } from "../../@constants/productConstants";

export const productReviewsLoggedinUserReducer = (state = { reviewsLoggedinUser: {} }, action) => {
    switch (action.type) {
        case WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_REQUEST:
            return {
                loading: true,
                reviewsLoggedinUser: {}
            }
        case WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_SUCCESS:
            return {
                loading: false,
                reviewsLoggedinUser : action.payload
            }
        case WRITE_PRODUCT_REVIEW_FOR_LOGGEDIN_USER_FAILURE:
            return {
                loading: false,
                error: action.payload.data.error,
                code : action.payload.status,
                reviewsLoggedinUser : {}
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