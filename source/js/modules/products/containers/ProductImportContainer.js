import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import toJs from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import {getImportData} from '../selectors/productsSelectors';
import ProductImport from '../components/ProductImport';
import {uploadImportProducts, resetImportProducts} from '../actions/productActions';
import {bindActionCreators} from 'redux';

class ProductImportContainer extends DefaultLayerLayout {

	handleUploadFile(file) {
		this.props.uploadFile({file});
	}

	componentDidMount() {
		super.componentDidMount();
		this.props.resetImport();
	}

	render() {
		const {importState:{uploading, error, result}}=this.props;
		return (
			<article className="page page_import_products" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Импорт товаров</h1>
				</div>
				<ProductImport onUploadFile={::this.handleUploadFile}
							   uploading={uploading}
							   result={result}
							   error={error}
							   onClose={::this.closeLayer}
				/>
			</article>
		);
	}
}

ProductImportContainer.propTypes = {
	selectedPoint: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return {
		importState: getImportData(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({
			uploadFile: uploadImportProducts.request,
			resetImport: resetImportProducts
		}, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(retailPointHOC(toJs(ProductImportContainer)));