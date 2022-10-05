import { CREATE_NEWS_LETTER_REQUEST, CREATE_NEWS_LETTER_SUCCESS, CREATE_NEWS_LETTER_FAILURE, CLEAR_ERRORS} from "../../@constants/newsLetterConstants"

export const createNewsLetterReducer = (state = { newsLetter: {} }, action) => {
    switch (action.type) {
        case CREATE_NEWS_LETTER_REQUEST:
            return {
                newsLetterLoading: true,
                newsLetterSuccess : false,
                newsLetter: {}
            }
        case CREATE_NEWS_LETTER_SUCCESS:
            return {
                newsLetterLoading: false,
                newsLetterSuccess : action.payload.success,
                newsLetter: action.payload.category
            }
        case CREATE_NEWS_LETTER_FAILURE:
            return {
                newsLetterLoading: false,
                newsLetterSuccess : false,
                newsLetterError: action.payload,
                newsLetter : {}
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