import axios from 'axios';

export const fetchFunds = () => {
    return axios.get(`/api/funds`);
};