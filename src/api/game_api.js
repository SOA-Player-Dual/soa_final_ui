import axios from './axiosClient';

const getAllGames = () => {
    return axios.get('game');
};

export { getAllGames };
