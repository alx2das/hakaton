import api from 'infrastructure/api/api'


export const checkConnect = () => {
    return api.api()//.v2().receipts()
        .get();
};