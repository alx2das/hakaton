import PropTypes from 'prop-types'
import React from 'react'
import CheckBox from '../FilterCheckBox'
import {DOCUMENT_TYPE, DOCUMENT_STATUS, getDocStatusName} from '../../enums'
import {DatePickerRange} from 'common/uiElements';

class DocumentsFilter extends React.Component {

	isClosable() {
		return !(this.drop && this.drop.isOpen());
	}

	render() {
		const {
			docType, selectedState, dateFrom, dateTo, ignoreCloseSelect,
			onChangeStatus, onChangeDocType, onChangeDate, onClearFilter
		}=this.props;

		const states = selectedState || [];

		return (<div>
			<div className="side_filter mt0">
				<div className="side_filter_name">Период</div>
				<DatePickerRange ignoreDropCloseAttr={ignoreCloseSelect}
								 dateFrom={dateFrom}
								 dateTo={dateTo}
								 onChange={onChangeDate}
								 setDropInstance={drop => this.drop = drop}/>
			</div>

			<div class="side_filter">
				<div class="side_filter_name">Тип документа</div>
				<ul>
					<CheckBox checked={docType == DOCUMENT_TYPE.SALE}
							  onChange={event => onChangeDocType(event, DOCUMENT_TYPE.SALE)}
							  id="checkboxSale"
							  label="Продажа"/>

					<CheckBox checked={docType == DOCUMENT_TYPE.RETURN}
							  onChange={event => onChangeDocType(event, DOCUMENT_TYPE.RETURN)}
							  id="checkboxReturn"
							  label="Возврат"/>
				</ul>
			</div>
			<div class="side_filter">
				<div class="side_filter_name">Статус</div>
				<ul>
					{Object.keys(DOCUMENT_STATUS).map(key => {
						return (<CheckBox key={key}
										  checked={states.indexOf(key) >= 0}
										  onChange={event => {
											  onChangeStatus(event, key);
										  }}
										  id={'key_' + key}
										  label={getDocStatusName(key)}/>);
					})}
				</ul>
			</div>
			<div className="side_filter">
				<a className="link_dashed" onClick={onClearFilter}><span>Очистить</span></a>
			</div>
		</div>)
	}
}

DocumentsFilter.propTypes = {
	docType: PropTypes.string,
	selectedState: PropTypes.array,
	dateFrom: PropTypes.instanceOf(Date),
	dateTo: PropTypes.instanceOf(Date),
	onChangeStatus: PropTypes.func.isRequired,
	onChangeDocType: PropTypes.func.isRequired,
	onChangeDate: PropTypes.func.isRequired,
	ignoreCloseSelect: PropTypes.string
};


export default DocumentsFilter;