import React from 'react';
import {connect} from 'react-redux';
import toJs from 'components/HOC/toJs';
import retailPointHOC from 'components/HOC/retailPointRequiredHOC';
import DefaultLayerLayout from 'components/DefaultLayerLayout';
import PropTypes from 'prop-types';

class ProductExportContainer extends DefaultLayerLayout {
	handleDownload() {
		const [protocol, _, host] = window.location.href.split("/").slice(0, 3);
		const downloadLink = document.createElement("a");
		downloadLink.href = `${protocol}//${host}/api/v1/download-catalog`;
		downloadLink.download = "catalog.xls";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}

	render() {
		return (
			<article className="page" {...this.layerOptions}>
				<div className="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Экспорт товаров</h1>
				</div>
				<div class="page_content">
					<div class="center_xy  page_center_info  page_center_info__import_from_file">
						<i class="icon_import"></i>
						<h2>Скачать справочник в формате XLS</h2>
						<p>Справочник будет сохранен в папку загрузки</p>
						<div class="form_buttons  row">
							<a class="button  button_file_upload  wide"
							   onClick={::this.handleDownload}>Экспортировать</a>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

ProductExportContainer.propTypes = {
	selectedPoint: PropTypes.string.isRequired,
};

export default connect((state) => ({}))(retailPointHOC(toJs(ProductExportContainer)));