import React from 'react';
import PropTypes from 'prop-types';
import ProductShape from './ProductShape';
import {AmountFormat} from 'common/uiElements'

class ProductItem extends React.Component {
    render() {
        const {item, onProductClick} = this.props;
        return (<div class='table_row   row_link' onClick={onProductClick}>
            <div class='product_id'>{item.inventCode}</div>
            <div class='product_name'>{item.name}</div>
            <div class='product_price'><AmountFormat value={item.price} /></div>
        </div>);
    }
}

ProductItem.propTypes = {
    item: ProductShape.isRequired,
    onProductClick: PropTypes.func.isRequired
};

export default ProductItem;
