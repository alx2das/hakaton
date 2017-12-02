export default (api) => {
	api.fn().v1().retailpoint().addResource('docs');
	api.v1().retailpoint().addResource('salesReport');

	const docs=api.fn().v1().retailpoint().addResource('docs');
	docs.addResource('requeue','re-queue');
};
