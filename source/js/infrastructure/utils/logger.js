export default {
	log(...props){
		if (__DEV__)
			console.log(...props);
	},

	warn(...props){
		if (__DEV__)
			console.warn(...props);
	},

	error(...props){
		if (__DEV__)
			console.error(...props);
	}
}