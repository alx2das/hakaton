import React from 'react';
import PropTypes from 'prop-types';
import BaseModal from './BaseModal';

/**
 * Попап для показа кастомного компонента в children
 */
class ModalPopup extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			isOpen: false
		};
	}

	/**
	 * открыть попап
	 */
	_open() {
		this.setState({
			isOpen: true
		});
	}

	isOpen() {
		return this.state.isOpen;
	}

	/**
	 * закрыть попап
	 */
	_close() {
		this.setState({
			isOpen: false
		});
	}

	render() {
		const {
			children, parentSelector = () => document.getElementById('root'),
			onAfterOpen, shouldCloseOnOverlayClick, onRequestClose
		}=this.props;
		const {isOpen} = this.state || {};
		return (<BaseModal isOpen={isOpen}
						   parentSelector={parentSelector}
						   onAfterOpen={onAfterOpen}
						   shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
						   onRequestClose={onRequestClose}>
			{children}</BaseModal>);
	}
}

ModalPopup.propTypes = {
	parentSelector: PropTypes.func,
	onAfterOpen: PropTypes.func,
	onRequestClose: PropTypes.func,
	shouldCloseOnOverlayClick: PropTypes.bool,
};

export default ModalPopup;