import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

/**
 * В этот компонент завернут react-modal, здес указаны все css-классы которые должны быть в модале, чтобы все нормально отрендерилось
 * @param children
 * @param isOpen
 * @param parentSelector
 * @param onAfterOpen
 * @param onRequestClose
 * @param shouldCloseOnOverlayClick
 * @returns {XML}
 * @constructor
 */
const BaseModal = ({
	children, isOpen, parentSelector, onAfterOpen, onRequestClose, shouldCloseOnOverlayClick = true
}) => {

	const handleOverlayOnClick = (event) => {
		if (shouldCloseOnOverlayClick) {
			onRequestClose && onRequestClose(event);
		}
	};

	return (<Modal isOpen={isOpen}
				   portalClassName="poss"
				   contentLabel=""
				   parentSelector={parentSelector}
				   onRequestClose={onRequestClose}
				   shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
				   onAfterOpen={onAfterOpen}
				   className={{
					   base: 'popup_table'
				   }}
				   overlayClassName={{
					   base: 'popup_overlay'
				   }}>
		<div className="popup_cell">
			{children}
			<div class="popup_backdrop" onClick={handleOverlayOnClick}></div>
		</div>

	</Modal>);
};

BaseModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	parentSelector: PropTypes.func,
	onAfterOpen: PropTypes.func,
	onRequestClose: PropTypes.func,
	shouldCloseOnOverlayClick: PropTypes.bool,
};

export default BaseModal;