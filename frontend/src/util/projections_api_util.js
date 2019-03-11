import axios from 'axios';

export const fetchProjection = (userId) => {
    return axios.get(`/api/users/${userId}`);
};

export const saveProjection = (projection) => {
    return axios.post('/api/projections', projection);
};