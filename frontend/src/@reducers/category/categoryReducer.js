import { ALL_CATEGORY_SUCCESS, ALL_CATEGORY_REQUEST, ALL_CATEGORY_FAILURE, CLEAR_ERRORS } from "../../@constants/categoryConstants"

export const categoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                catgLoading: true,
                categories: []
            }
        case ALL_CATEGORY_SUCCESS:
            return {
                catgLoading: false,
                categories: action.payload.categories
            }
        case ALL_CATEGORY_FAILURE:
            return {
                catgLoading: false,
                error: action.payload,
                categories : []
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
