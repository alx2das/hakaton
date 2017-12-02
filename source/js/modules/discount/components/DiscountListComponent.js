import React from 'react';
import PropTypes from 'prop-types';
import InfinateScroll from 'common/uiElements/InfinateScroll';


const columnList = [
	{code: 'code', cssClass: 'discount_id', name: 'Код', sort: true},
	{code: 'name', cssClass: 'discount_name', name: 'Название', sort: true},
	{code: 'value', cssClass: 'discount_size', name: 'Размер, %', sort: true}
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

	return <div className="table_head">{jsxHeader}</div>
};
const TableSearch = (props) => {
	return (
		<div className="table_row row_link_search">
			<input type="search"
				   className="small w100"
				   onChange={props.onFilterChanged}
				   placeholder="Введите название скидки"/>
		</div>
	);
};
const TableBody = (props) => {
	const jsxRows = props.list.map((row, i) => {
		const jsxCols = columnList.map((col) => {
			let valueText = '';

			switch (col.code) {
				default:
					valueText = row[col.code];
			}
			return <div className={col.cssClass} key={`col_${col.code}`}>{valueText}</div>
		});
		return <div className="table_row row_link" onClick={() => props.onOpenDetailLayout(row)}
					key={`row_${row.code}_${i}`}>{jsxCols}</div>
	});
	return <div>{jsxRows}</div>;
};

class DiscountListComponent extends React.Component {
	render() {
		const {
			listState,
			onFilterChanged, onInfinateScroll, onOpenDetailLayout, onSortList
		} = this.props;
		const noList = listState.list.length;

		return (
			<div className="widget_block">
				<div className="table table_discount">
					<TableHeader
						column={listState.sortField}
						orderBy={listState.sortDirection}
						onSortList={onSortList}/>

					<TableSearch
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

DiscountListComponent.propTypes = {
	listState: PropTypes.object.isRequired,
	onOpenDetailLayout: PropTypes.func.isRequired,
	onSortList: PropTypes.func.isRequired,
	onFilterChanged: PropTypes.func.isRequired,
	onInfinateScroll: PropTypes.func.isRequired
};

export default DiscountListComponent;