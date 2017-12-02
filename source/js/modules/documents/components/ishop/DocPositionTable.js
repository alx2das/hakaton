import React from 'react'
import PropTypes from 'prop-types'
import DocPositionRow from './DocPositionRow'
import DocPositionShape from './DocPositionShape'

const DocPositionTable = ({positions, totalSum}) => {

	const hasProducts = positions.length > 0;
	return (
		<div class="table  table_docs  table_docs__orders_add">
			<DocPositionRow isHeader={true}/>
			{positions.map(row => <DocPositionRow key={row.id} row={row}/>)}
			{!hasProducts && <div class="table_row ">
				<div class="info warning center_xy w100">Список пуст</div>
			</div>
			}
			{hasProducts && <DocPositionRow isFooter={true} total={totalSum}/>}
		</div>
	)
};

DocPositionTable.propTypes = {
	positions: PropTypes.arrayOf(DocPositionShape).isRequired,
	totalSum: PropTypes.number
};

export default DocPositionTable;
