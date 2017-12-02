import React from 'react'
import PropTypes from 'prop-types'
import DocumentShape from './DocumentShape'
import {getDocStatusName, getDocTypeName} from '../../enums'
import {DateFormat, AmountFormat, InfinateScroll, SortLink, LoaderPanel} from 'common/uiElements'

class ShopDocs extends React.Component {

	render() {
		const {
			loading, documents, totalCount, sortField, sortDirection, start,
			onLoadNext, onOpenDocument, onChangeFilter, onSort
		}=this.props;
		const notFound = !loading && documents.length == 0 ?
			(<div class="searching_results">
				<div class="light_block">По вашему запросу ничего не найдено</div>
			</div>) : null;

		const loadingBottom = loading && start > 0;
		const loadingFull = loading && start == 0;


		const orderRows = documents.map(doc => (
			<div key={doc.id} class="table_row  row_link" onClick={() => onOpenDocument(doc.id)}>
				<div class="doc_date"><DateFormat value={doc.checkoutDateTime} format="dd.mm.yyyy HH:MM"/></div>
				<div class="doc_type">{getDocTypeName(doc.docType)}</div>
				<div class="doc_number">{doc.docNum}</div>
				<div class="doc_amount"><AmountFormat value={doc.docSum}/></div>
				<div class="doc_status">{getDocStatusName(doc.currentState)}</div>
			</div>));

		return (<div class="widget_block">
			<div class="table  table_docs">
				<div class="table_head">
					<SortLink className="doc_date"
							  field="checkoutDateTime"
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Дата создания</SortLink>
					<SortLink className="doc_type"
							  field="docType"
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Тип документа</SortLink>
					<SortLink className="doc_number"
							  field="docNum"
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Номер документа</SortLink>
					<SortLink className="doc_amount"
							  field="docSum"
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Сумма</SortLink>
					<SortLink className="doc_status"
							  field="currentState"
							  sortField={sortField}
							  orderBy={sortDirection}
							  onClick={onSort}>Статус</SortLink>
				</div>
				<div class="table_row  row_link_search">
					<input type="search" class="small  w100"
						   placeholder="Номер документа или сумма"
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
								listLength={documents.length}
								loading={loadingBottom}/>
			</div>
		</div>)
	}
}

ShopDocs.propTypes = {
	documents: PropTypes.arrayOf(DocumentShape).isRequired,
	totalCount: PropTypes.number,
	loading: PropTypes.bool.isRequired,
	start: PropTypes.number,
	sortField: PropTypes.string,
	sortDirection: PropTypes.string,
	onLoadNext: PropTypes.func.isRequired,
	onOpenDocument: PropTypes.func.isRequired,
	onChangeFilter: PropTypes.func.isRequired,
	onSort: PropTypes.func.isRequired
};

export default ShopDocs;