import React from 'react'
import PropTypes from 'prop-types'

class TitleActions extends React.Component {
	static defaultProps = {
		onShowFilter: () => {
		},
		showButtons: false,
		isFiltered: false
	};

	componentWillUnmount() {
		$('.section_content').off('scroll');
	}

	componentDidMount() {
		$('.section_content').on('scroll', function () {
			const scroll = $(this).scrollTop();
			if (scroll >= 150) {
				$('.show_filter_panel.float').addClass("fixed");
			}
			else {
				$('.show_filter_panel.float').removeClass("fixed");
			}
		});
	}

	render() {
		const {onShowFilter, showButtons, children, isFiltered}=this.props;
		return (
			<div className="title_actions">
				{children}
				{showButtons &&
				<a className="button small light icon-filter show_filter_panel  right20"
				   onClick={onShowFilter}>Фильтры{isFiltered &&
				<span className="filter_count"/>}</a>}
				{showButtons &&
				<a className="button white icon-filter show_filter_panel float  right20"
				   onClick={onShowFilter}>
					{isFiltered && <span className="filter_count"/>}
				</a>}
			</div>
		);
	}
}

TitleActions.propTypes = {
	onShowFilter: PropTypes.func,
	showButtons: PropTypes.bool,
	isFiltered: PropTypes.bool
};

export default TitleActions;