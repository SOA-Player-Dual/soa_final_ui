import axios from 'axios';
import NProgress from 'nprogress';
import { refreshToken } from './user_api';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClientSetup = () => {
    const axiosClient = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosClient.interceptors.request.use(
        function (config) {
            NProgress.start();

            const token = localStorage.getItem('accessToken');

            config.headers.Authorization = token ? `Bearer ${token}` : '';

            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosClient.interceptors.response.use(
        function (response) {
            NProgress.done();

            return response;
        },
        function (error) {
            NProgress.done();
            if (error?.response?.status === 401) {
                refreshToken();
            }
            return Promise.reject(error);
        }
    );

    return axiosClient;
};

export default axiosClientSetup;
