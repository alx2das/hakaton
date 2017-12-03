export default (api) => {

    api.addResource('index');

    api.addResource('api').addResource('v2').addResource('receipts');
};
