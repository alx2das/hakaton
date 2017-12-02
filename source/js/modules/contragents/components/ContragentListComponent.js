import React from 'react'
import PropTypes from 'prop-types'
import InfinateScroll from 'common/uiElements/InfinateScroll'
import {ROLES} from '../enums/options'


const columnList = [
	{code: 'name', cssClass: 'contragent_name', name: 'Наименование контрагента', sort: true},
	{code: 'locked', cssClass: 'contragent_status', name: 'Статус', sort: true},
	{code: 'roles', cssClass: 'contragent_role', name: 'Роль'}
];

const TableHeader = (props) => {
	const jsxHeader = columnList.map((head) => {
		let className = head.cssClass;

		if (head.sort) {
			let by = (props.column === head.code ? (props.orderBy === 'asc' ? 'desc' : 'asc') : 'asc');
			className += (props.column === head.code ? ' icon-sort-' + (props.orderBy === 'asc' ? 'up' : 'down') : '');

			return (
				<a key={'head' + head.code} className={className} onClick={() => props.onSortList(head.code, by)}>
					{head.name}
				</a>
			);
		}
		else return <div key={head.code} className={head.cssClass}>{head.name}</div>
	});

	return (
		<div className="table_head">
			{jsxHeader}

			<div className="contragent_cashier_only">
				<input type="checkbox"
					   name="filter_cashier"
					   onChange={props.onCheckedCashier}
					   checked={props.isCashier}
					   id="filter_cashier_checkbox"/>
				<label htmlFor="filter_cashier_checkbox" className="label_check switcher switcher__cashier_only">
					<i className="icon"/>
					<span>Только кассиры</span>
				</label>
			</div>
		</div>
	)
};
const TableSearch = (props) => {
	return (
		<div className="table_row row_link_search">
			<input type="search"
				   className="small w100"
				   onChange={props.onFilterChanged}
				   value={props.inputValue}
				   placeholder="Введите наименование"/>
		</div>
	);
};
const TableBody = (props) => {
	const jsxRows = props.list.map((row, i) => {
		const jsxCols = columnList.map((col) => {
			let valueText = '';

			switch (col.code) {
				case ('locked'):
					valueText = row.locked == 'on' ? 'Неактивный' : 'Активный';
					break;
				case ('roles'):
					row.roles.forEach((role) => {
						valueText += (valueText.length > 0 ? ', ' : '') + (ROLES[role].label || role);
					});
					break;
				default:
					valueText = row[col.code];
			}
			return <div className={col.cssClass} key={'col' + col.code}>{valueText}</div>
		});
		return <div className="table_row row_link" onClick={() => props.onOpenDetailLayout(row)}
					key={'row' + row.code}>{jsxCols}</div>
	});
	return <div>{jsxRows}</div>;
};

class ContragentListComponent extends React.Component {
	render() {
		const {
			listState,
			onCheckedCashier, onFilterChanged, onInfinateScroll, onOpenDetailLayout, onSortList
		} = this.props;
		const noList = listState.list.length;

		return (
			<div className="widget_block">
				<div className="table table_contragents">
					<TableHeader
						column={listState.sortField}
						orderBy={listState.sortDirection}
						onCheckedCashier={onCheckedCashier}
						isCashier={listState.isCashier}
						onSortList={onSortList}/>

					<TableSearch
						inputValue={listState.q}
						onFilterChanged={onFilterChanged}/>

					<TableBody
						list={listState.list}
						onOpenDetailLayout={onOpenDetailLayout}/>

					{!noList && <div className='table_row center_xy'>По запросу ничего не найдено</div>}

					<InfinateScroll
						loadNext={onInfinateScroll}
						totalCount={listState.total_count}
						listLength={listState.list.length}
						loading={listState.loading}/>
				</div>
			</div>
		);
	}
}

ContragentListComponent.propTypes = {
	listState: PropTypes.object.isRequired,
	onOpenDetailLayout: PropTypes.func.isRequired,
	onSortList: PropTypes.func.isRequired,
	onFilterChanged: PropTypes.func.isRequired,
	onInfinateScroll: PropTypes.func.isRequired
};


export default ContragentListComponent;