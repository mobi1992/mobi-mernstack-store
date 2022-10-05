import axios from 'axios'
import { ALL_CATEGORY_SUCCESS, ALL_CATEGORY_REQUEST, ALL_CATEGORY_FAILURE} from "../../@constants/categoryConstants"
import { apis } from '../../@services/apis'

export const getCategories = () => async(dispatch) => {
    try {
        dispatch({
            type : ALL_CATEGORY_REQUEST
        })

        const {data} = await apis.getCatgs()
        
        dispatch({
            type : ALL_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ALL_CATEGORY_FAILURE,
            payload : error.response.data.error
        })
    }
}