import React from 'react';
import PropTypes from 'prop-types';
import * as actions from './actions';
import NotifySystem from 'react-notification-system';

class NotifyService extends React.Component {

	componentWillReceiveProps(nextProps) {
		if (!this.notify)
			return;
		const {notifications, dispatch} = nextProps;

		const notificationIds = notifications.map(notification => notification.uid);
		const systemNotifications = this.notify.state.notifications || [];

		if (notifications.length > 0) {
			// Get all active notifications from react-notification-system
			/// and remove all where uid is not found in the reducer
			(systemNotifications).forEach(notification => {
				if (notificationIds.indexOf(notification.uid) < 0) {
					this.notify.removeNotification(notification.uid);
				}
			});

			notifications.forEach(notification => {
				this.notify.addNotification({
					...notification,
					onRemove: () => {
						dispatch(actions.hide(notification.uid));
						notification.onRemove && notification.onRemove();
					}
				});
			});
		}

		if ((this.props.notifications !== notifications) && notifications.length === 0) {
			this.notify.clearNotifications();
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	}

	render() {
		const {notifications, ...rest} = this.props;

		return (
			<NotifySystem style={defaultStyle} ref={notify => this.notify = notify} { ...rest } />
		);
	}
}

const ItemStyle = {
	borderTop: 'none',
	color: '#fff',
	WebkitBoxShadow: 'none',
	MozBoxShadow: 'none',
	boxShadow: 'none',
};

const defaultStyle = {
	Containers: {
		DefaultStyle: {
			width: '410px',
			padding: '0px 10px 8px'
		},
	},
	NotificationItem: { // Override the notification item
		DefaultStyle: {
			borderRadius: '2px',
			fontSize: '15px',
			padding: '12px 16px',
			margin: '3px 0 0',
		},
		success: {
			backgroundColor: 'rgba(116,178,32,0.9)',
			...ItemStyle
		},
		error: {
			backgroundColor: 'rgba(225,50,50,0.9)',
			...ItemStyle
		},

		warning: {
			backgroundColor: 'rgba(45,70,104,0.9)',
			...ItemStyle
		},

		info: {
			backgroundColor: 'rgba(255,249,224,0.9)',
			...ItemStyle,
			color: '#2b2b2b'
		}
	},
	Title: {
		DefaultStyle: {
			fontSize: '15px',
			margin: '0 0 3px 0',
		},

		success: {
			color: '#fff'
		},

		error: {
			color: '#fff'
		},

		warning: {
			color: '#fff'
		},

		info: {
			color: '#2b2b2b'
		}
	},
	Action: {
		DefaultStyle: {
			background: '#ffffff',
			borderRadius: 0,
		},

		success: {
			backgroundColor: '#b0ca92'
		},

		error: {
			color: '#ffffff'
		},

		warning: {
			color: '#ffffff'
		},

		info: {
			color: '#ffffff'
		}
	},
	Dismiss: {
		DefaultStyle: {
			display: 'none'
		}
	}
};

NotifyService.propTypes = {
	notifications: PropTypes.array,
	style: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.object
	]),
	noAnimation: PropTypes.bool,
	allowHTML: PropTypes.bool
};

export default NotifyService;