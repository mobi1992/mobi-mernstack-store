import axios from 'axios'
import { CREATE_NEW_CATEGORY_REQUEST, CREATE_NEW_CATEGORY_SUCCESS, CREATE_NEW_CATEGORY_FAILURE} from "../../@constants/categoryConstants"
import { apis } from '../../@services/apis'

export const createNewCategory = ({name}) => async(dispatch) => {
    try {
        dispatch({
            type : CREATE_NEW_CATEGORY_REQUEST
        })

        const {data} = await apis.createNewCatg({name})
        
        dispatch({
            type : CREATE_NEW_CATEGORY_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : CREATE_NEW_CATEGORY_FAILURE,
            payload : error.response.data.error
        })
        console.log(error)
    }
}