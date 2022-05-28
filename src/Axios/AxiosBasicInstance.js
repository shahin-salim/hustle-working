import axios from 'axios'
import { BASE_URL } from '../Utils/Urls';

export const axiosBasicInstance = axios.create({
    baseURL: BASE_URL
});