import { CREATE_NEWS_LETTER_REQUEST, CREATE_NEWS_LETTER_SUCCESS, CREATE_NEWS_LETTER_FAILURE} from "../../@constants/newsLetterConstants"
import { apis } from '../../@services/apis'

export const createNewLetter = ({email}) => async(dispatch) => {
    try {
        dispatch({
            type : CREATE_NEWS_LETTER_REQUEST
        })

        const {data} = await apis.createNewsLetter({email})
        
        dispatch({
            type : CREATE_NEWS_LETTER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : CREATE_NEWS_LETTER_FAILURE,
            payload : error.response.data.error
        })
        console.log(error)
    }
}