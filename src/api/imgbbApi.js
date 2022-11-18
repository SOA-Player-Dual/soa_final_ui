import axios from './_baseApi';

const imgbbApi = axios(process.env.REACT_APP_IMGBB_API);

imgbbApi.interceptors.request.use(
    function (config) {
        config.headers['content-type'] = `multipart/form-data`;
        config.params = {
            key: process.env.REACT_APP_IMGBB_KEY,
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

imgbbApi.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default imgbbApi;
