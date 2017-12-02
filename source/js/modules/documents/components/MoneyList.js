import React from 'react'
import PropTypes from 'prop-types'
import {InfinateScroll, SortLink, LoaderPanel, DateFormat, AmountFormat} from 'common/uiElements'

import {NOT_VALUE} from "../enums/optionsDocument"
import {DOCUMENT_TYPE_NAMES} from "../../documents/enums"


class MoneyList extends React.Component {
	render() {
		const {
			searchText,
			listState: {loading, sortField, sortDirection, list, total_count},
			onHeadSortClick, onFilterChanged, onInfinateScroll
		} = this.props;

		return (
			<div className="widget_block">
				<div className="table table_docs">

					<div className="table_head">
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="dateCreated"
								  className="doc_date">Дата создания</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="type"
								  className="doc_type">Тип документа</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="shiftNum"
								  className="doc_smena_number">Номер смены</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="docNum"
								  className="doc_number">Номер документа</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="sum"
								  className="doc_amount">Сумма</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="cashier.name"
								  className="doc_cashier">Кассир</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="customer.name"
								  className="doc_contragent">Контрагент</SortLink>
						<SortLink sortField={sortField}
								  orderBy={sortDirection}
								  onClick={onHeadSortClick}
								  field="description"
								  className="doc_contragent">Комментарий</SortLink>
					</div>

					<div className="table_row row_link_search">
						<input type="search" className="small w100"
							   onChange={onFilterChanged} value={searchText}
							   placeholder="Введите номер документа"/>
					</div>

					<LoaderPanel loading={loading} className=''>
						{list.map(Item =>
							<div className="table_row" key={`row_${Item.id}`}>
								<div className="doc_date">
									<DateFormat value={Item.dateCreated}/>
								</div>
								<div className="doc_type">
									{Item.type ? DOCUMENT_TYPE_NAMES[Item.type] || NOT_VALUE : Item.type}
								</div>
								<div className="doc_smena_number">
									{Item.shiftDoc && toString(Item.shiftDoc.shiftNum) ? `Смена №${Item.shiftDoc.shiftNum}` : NOT_VALUE}
								</div>
								<div className="doc_number">
									Документ №{Item.docNum}
								</div>
								<div className="doc_amount">
									<AmountFormat value={Item.sum}/>
								</div>
								<div className="doc_cashier">
									{Item.cashier ? Item.cashier.name : NOT_VALUE}
								</div>
								<div className="doc_cashier">
									{Item.customer ? Item.customer.name : NOT_VALUE}
								</div>
								<div className="doc_cashier">
									{Item.description}
								</div>
							</div>
						)}
					</LoaderPanel>

					{!list.length && !loading &&
					<div className="searching_results">
						<div className="light_block">По запросу ничего не найдено</div>
					</div>}

					<InfinateScroll
						loadNext={onInfinateScroll}
						totalCount={total_count}
						listLength={list.length}/>
				</div>
			</div>
		)
	}
}

MoneyList.propTypes = {
	listState: PropTypes.shape({
		loading: PropTypes.bool,
		listStep: PropTypes.number, 				// кол-вы элементов за раз на вывод
		list: PropTypes.array.isRequired,			// список элементов
		sortField: PropTypes.string.isRequired,		// поле сортировки
		sortDirection: PropTypes.string.isRequired,	// направление сортировки
	}),

	onHeadSortClick: PropTypes.func.isRequired,		// при клике на имя столбца
	onFilterChanged: PropTypes.func.isRequired,		// при вводе в поле поиска
	onInfinateScroll: PropTypes.func.isRequired 	// при прокрутке к концу страницы
};


export default MoneyList