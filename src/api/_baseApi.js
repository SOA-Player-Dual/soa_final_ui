import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const baseAPI = (url) => {
    const api = axios.create({
        baseURL: url,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.request.use(
        function (config) {
            NProgress.start();
            return config;
        },
        function (error) {
            NProgress.done();
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        function (response) {
            NProgress.done();
            return response;
        },
        function (error) {
            NProgress.done();
            return Promise.reject(error);
        }
    );

    return api;
};

export default baseAPI;
