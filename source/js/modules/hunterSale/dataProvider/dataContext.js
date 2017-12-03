import api from 'infrastructure/api/api'


export const checkConnect = () => {
    return api.index()
        .get();
};