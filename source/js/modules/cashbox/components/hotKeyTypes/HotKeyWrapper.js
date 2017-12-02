import React from 'react'
import * as hotKeyHelper from '../../helpers/hotKeyHelper'
import KeyShape from '../KeyShape';
import HotKeyProduct from './HotKeyProduct'
import HotKeyCategory from './HotKeyCategory'
import HotKeyBackFromCategory from './HotKeyBackFromCategory'
import HotKeyEmpty from './HotKeyEmpty'
import HoyKeyDropTarget from './HoyKeyDropTarget'
import {HOT_KEY_TYPE} from '../../enums/enums';

const HotKeyWrapper = ({model, selected, ...props}) => {
	const isSelected = selected && ((selected.id && selected.id === model.id)
		|| (selected.tempId && selected.tempId === model.tempId));
	if (isSelected) {
		Object.keys(selected).forEach(k => {
			if (k !== 'id')
				model[k] = selected[k]
		});
	}
	const cordClass = hotKeyHelper.generateWrapperClass(model.row, model.col, model.width, model.height);
	const className = [cordClass, isSelected ? 'selected' : ''].join(' ');

	if (model.type === HOT_KEY_TYPE.PRODUCT) {
		return (<HotKeyProduct model={model} className={className} {...props}/>)
	}
	else if (model.type === HOT_KEY_TYPE.CATEGORY) {
		return (<HotKeyCategory model={model} className={className} {...props}/>)
	}
	else if (model.type === HOT_KEY_TYPE.BACK) {
		return (<HotKeyBackFromCategory className={className} {...props} />)
	}
	else if (model.type === HOT_KEY_TYPE.EMPTY) {
		return (<HotKeyEmpty className={className} {...props}/>)
	}
	else if (model.type === HOT_KEY_TYPE.DRAG) {
		return (<HoyKeyDropTarget className={className} model={model} {...props}/>)
	}

	return null;
};

HotKeyWrapper.propTypes = {
	model: KeyShape.isRequired,
	selected: KeyShape,
};

export default HotKeyWrapper;

