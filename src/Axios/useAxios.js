import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { REFRESH_TOKEN_URL } from '../Utils/Urls';
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs';
import { setUserStatus } from '../Redux/Actions/token.action';
import { axiosBasicInstance } from './AxiosBasicInstance';
import { BASE_URL } from '../Utils/Urls';

const useTheAxios = () => {
    const dispatch = useDispatch()

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    })

    axiosInstance.interceptors.request.use(async (config) => {

        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")

        if (accessToken && refreshToken) {

            const user = jwt_decode(accessToken)
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 20;
            console.log(!isExpired)
            if (!isExpired) return config


            try {
                const response = await axiosBasicInstance.post(REFRESH_TOKEN_URL, { refresh: refreshToken })
                localStorage.setItem("accessToken", response.data.access)
                localStorage.setItem("refreshToken", response.data.refresh)
                config.headers.Authorization = `Bearer ${response.data.access}`
            } catch (err) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                dispatch(setUserStatus(false))
            }
        }
        return config
    })
    return axiosInstance
}

export default useTheAxios