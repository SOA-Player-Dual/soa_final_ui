import axios from './_baseApi';

const authApi = axios(process.env.REACT_APP_API_URL);

authApi.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

authApi.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default authApi;
