import axios from "axios";
import { axiosBasicInstance } from "../../Axios/AxiosBasicInstance";
import { SET_SERVICES } from "../Constants/Services.constants"


// Fetch the services showing in home page
export const fetchServices = (URL) =>
    async (dispatch, getState) => {
        try {

            const { data } = await axiosBasicInstance.get(URL)
            console.log(data);

            dispatch({
                type: SET_SERVICES,
                payload: data
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }