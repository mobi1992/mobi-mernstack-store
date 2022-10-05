import { UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILURE, CLEAR_ERRORS } from "../../@constants/categoryConstants"

export const updateCategoryReducer = (state = { updatedCategory: {} }, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
            return {
                updatedCategoryLoading: true,
                updatedCategorySuccess : false,
                updatedCategory: {}
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                updatedCategoryLoading: false,
                updatedCategorySuccess : action.payload.success,
                updatedCategory: action.payload.category
            }
        case UPDATE_CATEGORY_FAILURE:
            return {
                updatedCategoryLoading: false,
                updatedCategorySuccess : false,
                updatedCategoryError: action.payload,
                updatedCategory : {}
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
