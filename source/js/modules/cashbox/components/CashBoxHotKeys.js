import React from 'react'
import PropTypes from 'prop-types'
import * as hotKeyHelper from '../helpers/hotKeyHelper'
import HotKeyWrapper from './hotKeyTypes/HotKeyWrapper'
import KeyShape from './KeyShape';
import withDragDropContext from 'components/withDragDropContext'
import {HOT_KEY_TYPE} from '../enums/enums';

class CashBoxHotKeys extends React.Component {
	constructor(props) {
		super(props);
		const {gridSize}=props;
		const matrix = hotKeyHelper.generateMatrix(gridSize);
		this.state = {gridSize, matrix};
	}

	componentWillReceiveProps(props) {
		const {gridSize}=props;
		const {gridSize:_gridSize}=this.state || {};
		if (_gridSize.width == gridSize.width && _gridSize.height == gridSize.height)
			return;
		const matrix = hotKeyHelper.generateMatrix(gridSize);
		this.setState({gridSize, matrix});
	}

	render() {
		const {
			keys, selectedKey, loadingProducts, gridSize, freezeMode,
			onSelectProduct, onOpenCategory, onSelectEmptyKey, onDragEnd, onBackFromCategory
		}=this.props;
		const {matrix}=this.state;
		const className = ['gk_panel_buttons', selectedKey ? 'cell_selected' : '', loadingProducts ? 'loading_block' : ''].join(' ');

		return (
			<div class={className}>
				{matrix.map((arr, i) => arr.map((cords, j) => (
					<HotKeyWrapper model={{...cords, type: HOT_KEY_TYPE.DRAG}}
								   selected={selectedKey}
								   keys={keys}
								   gridSize={gridSize}
								   freezeMode={freezeMode}
								   onBackFromCategory={onBackFromCategory}
								   onOpenCategory={onOpenCategory}
								   onSelectProduct={onSelectProduct}
								   onSelectEmptyKey={onSelectEmptyKey}/>))
				)}

				{matrix.map((arr, i) => arr.map((cords, j) => (
					<HotKeyWrapper model={{row: cords.row, col: cords.col, type: HOT_KEY_TYPE.EMPTY}}/>))
				)}

				{keys.map((model, i) => (<HotKeyWrapper key={i}
														onBackFromCategory={onBackFromCategory}
														onOpenCategory={onOpenCategory}
														freezeMode={freezeMode}
														onSelectProduct={onSelectProduct}
														onDragEnd={onDragEnd}
														model={model}
														selected={selectedKey}/>))}
			</div>
		)
	}
}


CashBoxHotKeys.propTypes = {
	gridSize: PropTypes.shape({
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired
	}),
	keys: PropTypes.arrayOf(KeyShape).isRequired,
	selectedKey: PropTypes.shape({
		id: PropTypes.string
	}),
	onSelectEmptyKey: PropTypes.func.isRequired,
	onOpenCategory: PropTypes.func.isRequired,
	onDragEnd: PropTypes.func,
	onBackFromCategory: PropTypes.func.isRequired,
	onSelectProduct: PropTypes.func.isRequired,
	loadingProducts: PropTypes.bool,
	freezeMode: PropTypes.bool
};

export default withDragDropContext(CashBoxHotKeys);


