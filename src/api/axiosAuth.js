import axios from 'axios';
import NProgress from 'nprogress';
// import queryString from 'query-string';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
    // paramsSerializer: (params) => {
    //     return queryString.stringify(params, { arrayFormat: 'repeat' });
    // },
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

        return response;
    },
    function (error) {
        NProgress.done();
        return Promise.reject(error);
    }
);

export default axiosClient;
