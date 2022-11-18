import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});

axiosClient.interceptors.request.use(
    function (config) {
        NProgress.start();

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        NProgress.done();

        // return response.data;
        return response;
    },
    function (error) {
        NProgress.done();
        return Promise.reject(error);
    }
);

export default axiosClient;
