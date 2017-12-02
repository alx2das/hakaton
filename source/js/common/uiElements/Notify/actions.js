import {SHOW_NOTIFICATION, HIDE_NOTIFICATION, REMOVE_ALL_NOTIFICATIONS} from './actionTypes';

//Example opts
// {
//   title: 'Hey, it\'s good to see you!',
//   message: 'Now you can see how easy it is to use notifications in React!',
//   position: 'tr',
//   autoDismiss: 0,
//   action: {
//     label: 'Awesome!',
//     callback: function() {
//       console.log('Clicked');
//     }
//   }
// }

const defaultOptions = {
	position: 'bl',
	autoDismiss: 5
};


export function show(opts = {}, level = 'success') {
	return {
		type: SHOW_NOTIFICATION,
		...opts,
		uid: opts.uid || Date.now(),
		level
	};
}


export function success(message, title = '') {
	return show({
		message,
		title,
		...defaultOptions
	}, 'success');
}

export function error(message, title = '') {
	return show({
		message,
		title,
		...defaultOptions
	}, 'error');
}

export function warning(message, title = '') {
	return show({
		message,
		title,
		...defaultOptions
	}, 'warning');
}

export function info(message, title = '') {
	return show({
		message,
		title,
		...defaultOptions
	}, 'info');
}


export function successWithOptions(opts) {
	return show(opts, 'success');
}

export function errorWithOptions(opts) {
	return show(opts, 'error');
}

export function warningWithOptions(opts) {
	return show(opts, 'warning');
}

export function infoWithOptions(opts) {
	return show(opts, 'info');
}

export function hide(uid) {
	return {
		type: HIDE_NOTIFICATION,
		uid
	};
}

export function removeAll() {
	return {type: REMOVE_ALL_NOTIFICATIONS};
}