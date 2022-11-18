import axios from './axiosClient';
import axiosAuth from './axiosAuth';

const Login = (username, password) => {
    return axiosAuth.post('v1/auth/login', { username, password });
};

const getProUsers = () => {
    return axios.get('user');
};

const getUserByURLCode = (urlCode) => {
    return axios.get(`user/${urlCode}`);
};

export { Login, getProUsers, getUserByURLCode };
