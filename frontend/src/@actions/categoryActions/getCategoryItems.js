import axios from 'axios'
import { CATEGORY_ITEMS_REQUEST, CATEGORY_ITEMS_SUCCESS, CATEGORY_ITEMS_FAILURE} from "../../@constants/categoryConstants"
import { apis } from '../../@services/apis'

export const getCategoryItems = (name, currentPage = 1, sortBy = '') => async(dispatch) => {
    try {
        dispatch({
            type : CATEGORY_ITEMS_REQUEST
        })

        const {data} = await apis.getCatgItems(name, currentPage, sortBy)
        
        dispatch({
            type : CATEGORY_ITEMS_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : CATEGORY_ITEMS_FAILURE,
            payload : error.response
        })
        console.log(error)
    }
}
