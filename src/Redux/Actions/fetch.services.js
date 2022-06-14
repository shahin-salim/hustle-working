import { SET_SERVICES } from "../Constants/Services.constants"


// Fetch the services showing in home page
export const fetchServices = (URL, AXIOS) =>
    async (dispatch, getState) => {
        try {
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