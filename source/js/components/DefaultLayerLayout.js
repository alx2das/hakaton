import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

class DefaultLayerLayout extends React.Component {
	static propTypes = {
		layerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		onCloseLayer: PropTypes.func.isRequired
	};

	layerOptions = {
		ref: el => this.el = el,
		'data-layer': this.props.layerId
	};

	addClass(el, className) {
		el.classList.add(className);//todo возможно потребуется заменить методы если где то не поддерживается
	}

	removeClass(el, className) {
		el.classList.remove(className); //todo возможно потребуется заменить методы если где то не поддерживается
	}

	getLayerId() {
		return this.props.layerId;
	}

	closeLayer() {
		// const el = this.el;
		// if (el) {
		// 	this.removeClass(el, 'open');
		// 	this.addClass(el, 'hide');
		// }
		// setTimeout(() => this.props.onCloseLayer({layerId: this.props.layerId}), 400);
		this.props.onCloseLayer({layerId: this.props.layerId})
	}

	toggleFullSize() {
		const el = this.getElement();
		const btn = el.querySelector('#page_expand_' + this.props.layerId);
		if (this.fullSize) {
			this.removeClass(el, 'fullsize');
			this.removeClass(btn, 'rotate');
			this.fullSize = false;
		}
		else {
			this.fullSize = true;
			this.addClass(btn, 'rotate');
			this.addClass(el, 'fullsize');
		}
		return false;
	}

	openLayer() {
		const el = this.getElement();
		el && setTimeout(() => this.addClass(el, 'open'), 100);
	}

	componentDidMount() {
		this.openLayer();
	}

	getCloseButton() {
		return (<a className="page_close icon-close" onClick={::this.closeLayer}></a>);
	}

	getToggleButton() {
		return (<a id={'page_expand_' + this.props.layerId} className="page_expand icon-fullsize"
				   onClick={::this.toggleFullSize}></a>);
	}

	getElement() {
		if (!this.el) {
			console.warn('Отсутствует layerOptions в article-элементе слоя');
			return ReactDOM.findDOMNode(this);
		}
		return this.el;
	}

	render() {
		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header header_height_auto">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Тестовый слой</h1>
				</div>
				<div className="page_content">
					{this.props.children}
				</div>
			</article>
		);
	}
}

export default DefaultLayerLayout;