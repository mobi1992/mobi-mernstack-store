import { CREATE_NEW_ORDER_REQUEST_LOGGEDIN_USER, CREATE_NEW_ORDER_SUCCESS_LOGGEDIN_USER, CREATE_NEW_ORDER_FAILURE_LOGGEDIN_USER, CLEAR_ERRORS} from "../../@constants/orderConstants";

export const createNewOrderLoggedinUserReducer = (state = { createNewOrderloggedinUsr: {} }, action) => {
    switch (action.type) {
        case CREATE_NEW_ORDER_REQUEST_LOGGEDIN_USER:
            return {
                createNewOrderloggedinUsrLoading: true,
                createNewOrderloggedinUsr : null,
                createNewOrderloggedinUsrSuccess : null
            }
        case CREATE_NEW_ORDER_SUCCESS_LOGGEDIN_USER:
            return {
                createNewOrderloggedinUsrLoading: false,
                createNewOrderloggedinUsr : action.payload,
                createNewOrderloggedinUsrSuccess : action.payload.success
            }
        case CREATE_NEW_ORDER_FAILURE_LOGGEDIN_USER:
            return {
                createNewOrderloggedinUsrLoading: false,
                createNewOrderloggedinUsrError: action.payload,
                createNewOrderloggedinUsr : null,
                createNewOrderloggedinUsrSuccess : null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                createNewOrderloggedinUsrError : null
            }
        default:
            return state
    }
}
