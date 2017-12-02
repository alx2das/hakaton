import React from 'react'
import PropTypes from 'prop-types'
import OrderShape from './OrderShape'
import {DateFormat, AmountFormat, InfinateScroll, SortLink, LoaderPanel} from 'common/uiElements'

class OrderList extends React.Component {

	render() {
		const {
			loading, orders, totalCount, sortField, sortDirection, start,
			onLoadNext, onOpenOrder, onChangeFilter, onSort
		}=this.props;
		const notFound = !loading && orders.length == 0 ?
			(<div class="searching_results">
				<div class="light_block">По вашему запросу ничего не найдено</div>
			</div>) : null;

		const loadingBottom = loading && start > 0;
		const loadingFull = loading && start == 0;

		const orderRows = orders.map(order => (
			<div key={order.id} class="table_row  row_link" onClick={() => onOpenOrder(order.id)}>
				<div class="doc_date"><DateFormat value={order.beginDateTime} format="dd.mm.yyyy HH:MM"/></div>
				<div class="doc_number">{order.docNum}</div>
				<div class="doc_amount"><AmountFormat value={order.actualSum}/></div>
				{/*<div class="doc_cashier">{order.cashier || 'Н/Д'}</div>*/}
				<div class="doc_comment">{order.description}</div>
			</div>));

		return (<div class="widget_block">
			<div class="table  table_docs">
				<div class="table_head">
					<SortLink className="doc_date"
							  field='beginDateTime'
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Дата создания</SortLink>
					<SortLink className="doc_number"
							  field='docNum'
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Номер документа</SortLink>
					<SortLink className="doc_amount"
							  field='actualSum'
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Сумма</SortLink>
					{/*<SortLink className="doc_cashier"*/}
					{/*field='cashier.name'*/}
					{/*sortField={sortField}*/}
					{/*orderBy={sortDirection}*/}
					{/*onClick={onSort}>Кассир</SortLink>*/}
					<div class="doc_comment">Комментарий</div>
				</div>
				<div class="table_row  row_link_search">
					<input type="search" class="small  w100"
						   placeholder="Номер документа, комментарий или сумма"
						   onChange={onChangeFilter}/>
				</div>
				<LoaderPanel loading={loadingFull}
							 style={{minHeight: '40px'}}
							 className=''>
					{orderRows}
				</LoaderPanel>
				{notFound}
				<InfinateScroll loadNext={onLoadNext}
								totalCount={totalCount}
								listLength={orders.length}
								loading={loadingBottom}/>
			</div>
		</div>)
	}
}

OrderList.propTypes = {
	orders: PropTypes.arrayOf(OrderShape).isRequired,
	totalCount: PropTypes.number,
	loading: PropTypes.bool.isRequired,
	sortField: PropTypes.string,
	sortDirection: PropTypes.string,
	start: PropTypes.number,
	onLoadNext: PropTypes.func.isRequired,
	onOpenOrder: PropTypes.func.isRequired,
	onChangeFilter: PropTypes.func.isRequired,
	onSort: PropTypes.func.isRequired
};

export default OrderList;