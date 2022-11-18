import axios from './_baseApi';

const gameApi = axios(process.env.REACT_APP_API_URL);

gameApi.interceptors.request.use(
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

gameApi.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default gameApi;
