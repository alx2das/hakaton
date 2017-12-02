export default (api) => {
	api.v1().retailpoint().addResource('nextExtdocDocnum','next-extdoc-docnum');
	api.v1().retailpoint().addResource('cashdocs');
	api.v1().retailpoint().addResource('moneyDocs', 'moneydocs');
	const shift = api.v1().retailpoint().addResource('shift');
	shift.addResource('cashdoc');
};
