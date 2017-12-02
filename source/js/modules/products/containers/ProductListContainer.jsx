import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'connected-react-router'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getProducts, createProduct, searchProductList, setFilter} from '../actions/productActions';
import ProductList from '../components/ProductsList/ProductListComponent';
import ProductActions from '../components/ProductsList/ProductActions';
import {
    getProductsList,
    getProductLoading,
    getTotalCount,
    getFilter,
    getProductListError
} from '../selectors/productsSelectors'
import toJs from 'components/HOC/toJs'
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import {LoaderPanel} from 'common/uiElements'

class ProductListContainer extends React.Component {

    static defaultProps = {
        pageSize: 50
    };

    exportProduct() {
        const [protocol, _, host] = window.location.href.split("/").slice(0, 3);
        const downloadLink = document.createElement("a");

        downloadLink.href = `${protocol}//${host}/api/v1/download-catalog`;
        downloadLink.download = "catalog.xls";
        downloadLink.innerHTML = downloadLink.href;
        downloadLink.setAttribute('target', '_blank');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    createProduct() {
        this.props.createProduct();
    }

    openProduct(code) {
        const {push, selectedPoint} = this.props;
        push({pathname: `/product/view/point/${selectedPoint}/code/${code}`});
    }

    componentDidMount() {
        this.setFilter({
            restart: true,
            filter: '',
            count: this.props.pageSize,
            sortField: 'name',
            sortDirection: 'asc'
        });
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPoint != this.props.selectedPoint) {
            this.setFilter({restart: true});
            this.props.getProducts();
        }
    }

    handleLoadMore() {
        this.props.getProducts();
    }

    setFilter(filter) {
        this.props.setFilter({filter});
    }

    handleChangeFilter(event) {
        let value = event.target.value;
        if (value && value.length > 2) {
            this.setFilter({restart: true, filter: value});
            this.props.searchProductList();
        } else if (!value) {
            this.setFilter({restart: true, filter: ''});
            this.props.searchProductList();
        }
    }

    handleSortChange(sortField, sortDirection) {
        this.setFilter({sortField, sortDirection, restart: true});
        this.props.getProducts();
    }


    render() {
        const {products, loading, totalCount, sortField, sortDirection, error, filter, start} = this.props;
        const noProducts = totalCount == 0 && !filter;
        const showPanel = !noProducts;

        return (
            <div>
                <div class="title_panel">

                    <h1>Все товары</h1>

                    {showPanel &&
                    <ProductActions onCreateProduct={::this.createProduct}
                                    onExportProduct={::this.exportProduct}/>}
                </div>

                {!noProducts &&
                <ProductList items={products}
                             loading={loading}
                             totalCount={totalCount}
                             sortField={sortField}
                             sortDirection={sortDirection}
                             start={start}
                             openProduct={::this.openProduct}
                             onLoadNext={::this.handleLoadMore}
                             onFilterChanged={::this.handleChangeFilter}
                             onSortChanged={::this.handleSortChange}/>
                }

                {noProducts && !loading &&
                <div class="center_xy  page_center_info  page_center_info__products0">
                    <i class="icon icon_box_empty"></i>
                    <div class="title">Список товаров пуст</div>
                    <p>Добавьте товар или импортируйте из своего файла</p>
                    <div class="form_buttons  row">
                        <button class="button small icon-plus" onClick={::this.createProduct}>Добавить товар</button>
                        <Link class="button button_file_upload small light  ml8" to="/products/import">Импортировать из
                            файла</Link>
                    </div>
                </div>}
                {noProducts && loading && <LoaderPanel loading={loading}/>}
                {error && <div className="info info_error">При получении списка произошла ошибка</div>}
            </div>);
    }
}


function mapStateToProps(state, ownProps) {
    return {
        error: getProductListError(state),
        products: getProductsList(state),
        loading: getProductLoading(state),
        totalCount: getTotalCount(state),
        sortField: getFilter(state).get('sortField'),
        sortDirection: getFilter(state).get('sortDirection'),
        filter: getFilter(state).get('filter'),
        start: getFilter(state).get('start')
    }
}


//todo https://docs.mobify.com/progressive-web/latest/guides/best-practices-guide/
function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            setFilter: setFilter,
            getProducts: getProducts.request,
            searchProductList: searchProductList,
            push: push,
            createProduct: createProduct
        }, dispatch)
    }
}

ProductListContainer.propTypes = {
    selectedPoint: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(toJs(ProductListContainer)));
