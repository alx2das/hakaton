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

export const getOptions = (actRPointID) => {
    return api.api().challenges()
        .get({storeUuid: actRPointID}).then(res => res.data && res.data[0] || null);
}