import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const updateUserProfile = ({firstName, lastName, email}) => async(dispatch) => {
    try {
        dispatch({
            type : UPDATE_PROFILE_REQUEST
        })

        const {data} = await apis.updateProfile({firstName, lastName, email})

        dispatch({
            type : UPDATE_PROFILE_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UPDATE_PROFILE_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}