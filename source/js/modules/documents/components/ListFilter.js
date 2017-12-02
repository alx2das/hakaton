import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import PropTypes from 'prop-types'

class ListFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false};
	}

	componentDidMount() {
		this.props.setInstance(this);
	}

	componentWillUnmount() {
		this.props.setInstance(null);
	}

	close(e) {
		if (e && !this.searchParentsIgnore(e))
			return false;

		if (!this.isOpen())
			return;

		if (this.props.isClosable && !this.props.isClosable())
			return;

		this.el && this.el.classList.remove('visible');
		setTimeout(() => this.setState({isOpen: false}), 500);
	}

	open() {
		if (this.isOpen())
			return;

		this.setState({isOpen: true}, () => {
			setTimeout(() => this.el && this.el.classList.add('visible'), 10);
		});
	}

	searchParentsIgnore(event) {
		const dataIgnore = this.props.ignoreCloseSelect
		if (!dataIgnore)
			return true;
		let target = event.target;
		while (target !== null) {
			if (target.attributes && target.attributes['data-ignore'] && target.attributes['data-ignore'].nodeValue === dataIgnore) {
				return false;
			}
			target = target.parentNode;
		}
		return true;
	}

	handleClickOutside(e) {
		this.close(e);
	}

	onMouseLeave() {
		this.close();
	}

	isOpen() {
		return this.state.isOpen;
	}

	render() {
		const {isOpen} = this.state;

		// if (!isOpen)
		// 	return null;

		return (<div ref={el => this.el = el} class="filter_panel right0" onMouseLeave={::this.onMouseLeave}>
			{this.props.children}
		</div>);
	}
}

ListFilter.propTypes = {
	setInstance: PropTypes.func.isRequired,
	isClosable: PropTypes.func
};

export default enhanceWithClickOutside(ListFilter);