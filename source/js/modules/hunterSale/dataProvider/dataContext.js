import api from 'infrastructure/api/api'


export const checkConnect = () => {
    return api.index()
        .get();
};

export const getStories = (params) => {
    return api.api().stories()
        .get(params);
};