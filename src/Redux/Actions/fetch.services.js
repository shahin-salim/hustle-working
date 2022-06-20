import { BASE_URL } from "../../Utils/Urls";
import { SET_SERVICES } from "../Constants/Services.constants"


// Fetch the services showing in home page
export const fetchServices = (URL, AXIOS) =>
    async (dispatch, getState) => {
        try {

            console.log(URL);
            console.log(AXIOS);
            console.log(BASE_URL);

            const { data } = await AXIOS.get(URL)
            console.log("fetched data");
            console.log(data);


            dispatch({
                type: SET_SERVICES,
                payload: data
            })
        } catch (error) {

            console.log(error)
        }
    }


export const searchingServices = (data) =>
    async (dispatch, getState) => {

        dispatch({
            type: SET_SERVICES,
            payload: data
        })

    }