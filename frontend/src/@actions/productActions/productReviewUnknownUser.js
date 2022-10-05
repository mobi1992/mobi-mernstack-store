import { WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_FAILURE, WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_REQUEST, WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_SUCCESS } from "../../@constants/productConstants";
import { apis } from "../../@services/apis";

export const productReviewsUnknownUser = (name, productId, comment, rating) => async (dispatch) =>  {
    try {
        dispatch({
            type : WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_REQUEST
        })

        const {data} = await apis.writeReviewUnknownUser(name, productId, comment, rating)

        dispatch({
            type : WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : WRITE_PRODUCT_REVIEW_FOR_UNKNOWN_USER_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}
