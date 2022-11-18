import axios from './_baseApi';

const userApi = axios(process.env.REACT_APP_API_URL);

userApi.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'accessToken'
        )}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

userApi.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default userApi;
