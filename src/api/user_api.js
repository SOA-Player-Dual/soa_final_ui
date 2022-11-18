import axios from './axiosClient';

const Login = (username, password) => {
    const auth = axios();
    return auth.post('v1/auth/login', { username, password });
};

const getProUsers = () => {
    return axios.get('user');
};

const getUserByURLCode = (urlCode) => {
    return axios.get(`user/${urlCode}`);
};

const refreshToken = () => {
    return axios.get('v1/auth/refresh');
};

export { Login, getProUsers, getUserByURLCode, refreshToken };
