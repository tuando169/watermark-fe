import axios from "axios";
import Cookies from 'js-cookie';
import router from "@/router";

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // else {
        //     router.push({name: 'login'});
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

export const axiosClient = axios;
