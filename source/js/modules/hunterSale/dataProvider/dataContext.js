import api from 'infrastructure/api/api'


export const checkConnect = () => {
    return api.index()
        .get();
};

export const getStories = (params) => {
    return api.api().stories()
        .get(params).then(res => res.data);
};

export const getStatistics = (uid) => {
    return api.api().statistics()
        .get({uid}).then(res => res.data);
};