import axios from './axiosMedia';

const getLinkImage = (image) => {
    return axios.post(`{$media_api_url}/api/media/get-link-image`, { image });
};
