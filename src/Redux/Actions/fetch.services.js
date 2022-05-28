import axios from "axios";
import { axiosBasicInstance } from "../../Axios/AxiosBasicInstance";
import { FETCH_SERVICES_URL } from "../../Utils/Urls";
import { SET_SERVICES } from "../Constants/Services.constants"


// Fetch the services showing in home page
export const fetchServices = () =>
    async (dispatch, getState) => {
        try {

            const { data } = await axiosBasicInstance.get("/services/list_service/")
            console.log(data);

            dispatch({
                type: SET_SERVICES,
                payload: data
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }