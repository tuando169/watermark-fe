import axios from "axios";
import Cookies from 'js-cookie';
import router from "@/router";

axios.interceptors.request.use(
    (config) => {
        config.headers.crossorigin = 'use-credentials'
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const axiosClient = axios;
