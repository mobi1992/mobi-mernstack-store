import { ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, ALL_PRODUCT_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const getProducts = (keyword='', currentPage = 1, sortBy='') => async (dispatch) =>  {
    try {
        dispatch({
            type : ALL_PRODUCT_REQUEST
        })

        const {data} = await apis.getProds(keyword, currentPage, sortBy)

        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ALL_PRODUCT_FAILURE,
            payload : error.response,
        })
        // console.log(error)
    }
}

