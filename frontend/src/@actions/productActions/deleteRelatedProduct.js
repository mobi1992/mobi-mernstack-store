import { DELETE_RELATED_PRODUCT_REQUEST, DELETE_RELATED_PRODUCT_SUCCESS, DELETE_RELATED_PRODUCT_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const deleteRelatedProduct = (relatedProdId, id) => async (dispatch) =>  {
    try {
        dispatch({
            type : DELETE_RELATED_PRODUCT_REQUEST
        })

        const {data} = await apis.deleteRelPr(relatedProdId, id)

        dispatch({
            type : DELETE_RELATED_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : DELETE_RELATED_PRODUCT_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

