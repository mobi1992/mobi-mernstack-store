import { UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAILURE } from "../../@constants/userConstants";
import { apis } from "../../@services/apis";

export const updateUserAddress = ({country, province, city, address, postalCode, phoneNo}) => async(dispatch) => {
    try {
        dispatch({
            type : UPDATE_ADDRESS_REQUEST
        })

        const {data} = await apis.updateAddress({country, province, city, address, postalCode, phoneNo})

        dispatch({
            type : UPDATE_ADDRESS_SUCCESS,
            payload : data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type : UPDATE_ADDRESS_FAILURE,
            payload : error.response.data.error,
        })
        console.log(error)
    }
}