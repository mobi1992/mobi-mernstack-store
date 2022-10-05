import { DELETE_PRODUCT_CATEGORY_REQUEST, DELETE_PRODUCT_CATEGORY_SUCCESS, DELETE_PRODUCT_CATEGORY_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const deleteProductCategory = (catgId, id) => async (dispatch) =>  {
    try {
        dispatch({
            type : DELETE_PRODUCT_CATEGORY_REQUEST
        })

        const {data} = await apis.deleteProdCatg(catgId, id)

        dispatch({
            type : DELETE_PRODUCT_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : DELETE_PRODUCT_CATEGORY_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

