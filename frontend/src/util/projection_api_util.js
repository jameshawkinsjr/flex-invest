import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const fetchProjection = (userId) => {
    return axios.get(`/api/users/${userId}`);
};

export const saveProjection = (projection) => {
    return axios.post('/api/projection', projection);
};