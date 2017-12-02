export default (api) => {
	api.addResource('v1');
	let fn = api.addResource('fn');
	fn.addResource('v1');


    api.addResource('api').addResource('v2').addResource('receipts');
};
