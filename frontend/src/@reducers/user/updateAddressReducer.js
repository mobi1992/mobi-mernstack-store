import { UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE, CLEAR_ERRORS } from "../../@constants/userConstants";

export const updateAddressReducer = (state = { updatedUserAddress: {} }, action) => {
    switch (action.type) {
        case UPDATE_ADDRESS_REQUEST:
            return {
                loading: true,
                updatedUserAddress : null
            }
        case UPDATE_ADDRESS_SUCCESS:
            return {
                loading: false,
                updatedUserAddress : action.payload,
                success : true
            }
        case UPDATE_ADDRESS_FAILURE:
            return {
                loading: false,
                error: action.payload,
                updatedUserAddress : null,
                success : false
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