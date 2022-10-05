import axios from 'axios'
import { PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAILURE } from "../../@constants/productConstants"
import { apis } from '../../@services/apis'

export const getProductDetail = (id) => async (dispatch) =>  {
    try {
        dispatch({
            type : PRODUCT_DETAIL_REQUEST
        })

        const {data} = await apis.getProdDetail(id)

        dispatch({
            type : PRODUCT_DETAIL_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_DETAIL_FAILURE,
            payload : error.response,
        })
        console.log(error)
    }
}

