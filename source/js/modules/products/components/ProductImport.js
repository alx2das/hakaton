import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'common/uiElements';
import ProductImportReport from './ProductImportReport';
class ProductImport extends React.Component {


	handleUpload(files) {
		const {onUploadFile} = this.props;
		files && files.length && onUploadFile(files[0]);
	}

	openFileDialog() {
		this.fileUploadInput.click();
	}


	render() {
		const {uploading, result, error, onClose} = this.props;

		const isDefault = !uploading && !result && !error;
		const isUploading = uploading;
		const UploadFileButton = (text, className) => {
			return (<div class={className}>
				{text}
				<input type="file"
					   onChange={ev => this.handleUpload(ev.target.files)}/>
			</div>)
		};
		return (
			<div className='page_content'>
				{isDefault &&
				<div class="center_xy  page_center_info  page_center_info__import_from_file">
					<i class="icon_import"></i>
					<h2>Импортируйте свои товары из файла</h2>
					<p>Файл должен быть в формате csv или xls.<br/> Если не знаете как сформировать файл<br/>
						<a href="/static/catalog-demo-import.xls" target="_blank">скачайте наш пример</a></p>
					<div class="form_buttons  row">
						{UploadFileButton('Выбрать файл', 'button button_file_upload wide')}
					</div>
				</div>}
				{isUploading &&
				<div class="center_xy  page_center_info">
					<div class="loading big">
						<div>Идет загрузка ваших товаров</div>
					</div>
				</div>}
				{!!result && <ProductImportReport report={result}
												  onClose={onClose}
												  onUploadFile={::this.handleUpload}
				/>
				}
				{!!error &&
				<div class="page_center_info  page_center_info__import_report report_error">
					<i class="icon icon_box_complete"></i>
					<div class="title">Справочник не обновлен</div>
					<p>К сожалению, загрузить товары не удалось. Убедитесь в корректности <br/>данных справочников
						товаров и попробуйте снова.</p>
					<div class="form_buttons">
						<button onClick={onClose} class="button  small  wide">Закрыть</button>
						{UploadFileButton('Загрузить другой файл', 'button small light button_file_upload')}
					</div>
				</div>
				}
			</div>
		)
	}
}

ProductImport.propTypes = {
	onUploadFile: PropTypes.func.isRequired,
	uploading: PropTypes.bool.isRequired,
	result: PropTypes.object,
	error: PropTypes.object,
	onClose: PropTypes.func.isRequired
};

export default ProductImport;

