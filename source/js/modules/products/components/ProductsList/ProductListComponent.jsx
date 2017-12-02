/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
const {arrayOf} = PropTypes;
import {SortLink, LoaderPanel} from 'common/uiElements'
import ProductShape from './ProductShape';
import ProductItem from './ProductItem';

import {InfinateScroll} from 'common/uiElements'


class ProductListComponent extends React.Component {

    render() {
        const {
            items, loading, onLoadNext, sortField, sortDirection, totalCount, start,
            onFilterChanged, onSortChanged, openProduct,
        } = this.props;
        const productItems = items.map(product => <ProductItem item={ product } key={product.inventCode}
                                                               onProductClick={() => openProduct(product.inventCode)}/>);

        const notFound = !loading && productItems.length == 0 ?
            (<div class="searching_results">
                <div class="light_block">По запросу ничего не найдено</div>
            </div>) : null;

        const loadingBottom = loading && start > 0;
        const loadingFull = loading && start == 0;

        return (
            <div class='widget_block' style={{minHeight: '100px'}}>
                <div class='table  table_products'>
                    <div class='table_head'>
                        <SortLink className='product_id' field='inventCode'
                                  sortField={sortField}
                                  orderBy={sortDirection}
                                  onClick={onSortChanged}>Код</SortLink>
                        <SortLink className='product_name' field='name'
                                  sortField={sortField}
                                  orderBy={sortDirection}
                                  onClick={onSortChanged}>Наименование</SortLink>
                        <SortLink className='product_price' field='price'
                                  sortField={sortField}
                                  orderBy={sortDirection}
                                  onClick={onSortChanged}>Цена</SortLink>
                    </div>
                    <div class='table_row  row_link_search'>
                        <input
                            type='search' class='small  w100'
                            placeholder='Введите код, наименование или цену товара'
                            onChange={onFilterChanged}
                        />
                    </div>
                    <LoaderPanel loading={loadingFull}
                                 style={{minHeight: '40px'}}
                                 className=''>
                        {productItems}
                    </LoaderPanel>
                    {notFound}
                    <InfinateScroll loadNext={onLoadNext}
                                    totalCount={totalCount}
                                    listLength={items.length}
                                    loading={loadingBottom}/>
                </div>
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    items: arrayOf(ProductShape).isRequired,
    openProduct: PropTypes.func.isRequired,
    onFilterChanged: PropTypes.func.isRequired,
    onSortChanged: PropTypes.func.isRequired,
    onLoadNext: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    totalCount: PropTypes.number,
    start: PropTypes.number,
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
};

export default ProductListComponent;
