import axios from 'axios'
import { CHAT_SERVER_URL } from '../Utils/Urls';

export const chatServerUrl = axios.create({
    baseURL: CHAT_SERVER_URL
});