import React from 'react';
import PropTypes from 'prop-types';
import {pluralize} from 'common/helpers/stringHelper'

class ProductImportReport extends React.Component {

	handleClose() {
		this.props.onClose();
	}

	renderErrors() {
		const {report}=this.props;
		const errors = report.importResults.filter(s => s.errors.length > 0);
		if (errors.length == 0)
			return null;

		const getDotName = points => points.length > 1 ? 'точек' : 'точки';
		const getSheetTitle = sheet => (
			<div class="title">Ошибки в листе "{sheet.name}", для&nbsp;{getDotName(sheet.points)}&nbsp;
				-&nbsp;{sheet.points.join(', ')}</div>);
		const getSheetError = row => (
			<p>Строка { row.rowNumber }: <span
				class="c_error">{ row.error ? row.error : row.duplicate ? 'Дублирование' : 'Неизвестная ошибка' }</span>
			</p>);

		return (<div class="import_errors_list">{errors.map(sheet => {
			return [getSheetTitle(sheet), sheet.errors.map(getSheetError)]
		})}</div>);
	}

	renderDuplicates() {
		const {report}=this.props;

		const duplicates = report.importResults.filter(s => s.duplicates.length > 0).map(sheet => {
			const dotName = sheet.points.length > 1 ? 'точек' : 'точки';
			return (
				<div>
					<p>В листе {sheet.name}, для {dotName} - {sheet.points.join(', ')}</p>
					{sheet.duplicates.map(row => (<p>В строке { row.rowNumber } дубликат: { row.name }</p>))}
				</div>
			);
		});
		if (duplicates.length > 0)
			return (<div><p>Дубликаты</p> {duplicates} </div>);
		return null;
	}

	renderIgnored() {
		const {report}=this.props;
		return report.ignoredSheets.length > 0 ? (
				<p>
					<span>{report.ignoredSheets.length}</span> {pluralize(report.ignoredSheets.length, 'лист пропущен', 'листа пропущено', 'листов пропущено')}
				</p>) : null;
	}

	renderFailed() {
		const {report}=this.props;
		return report.failedCount > 0 ? (
				<p class="products_error">
					<span>{report.failedCount}</span> {pluralize(report.failedCount, 'товар', 'товара', 'товаров')} с
					ошибкой</p>) : null;
	}

	render() {
		const {report, onUploadFile}=this.props;
		const errors = this.renderErrors();
		const duplicates = this.renderDuplicates();
		const ignored = this.renderIgnored();
		const failed = this.renderFailed();

		return (<div>
			<div class="center_xy page_center_info  page_center_info__import_report">
				<i class="icon icon_box_complete"></i>
				<div class="title">Справочник обновлен</div>

				<p>
					<span>{report.successCount}</span> {pluralize(report.successCount, 'товар', 'товара', 'товаров')}&nbsp;
					добавлено/обновлено
					из&nbsp;{report.importResults.length}&nbsp;{report.importResults.length == 1 ? 'листа' : 'листов'}
				</p>
				{/*{failed}*/}
				{/*{ignored}*/}
				<p class="c_light f_small">Не забудьте обновить справочник товаров на кассе: Меню > Сервис >
					Синхронизация</p>
				<div class="form_buttons">

					<button class="button small wide" onClick={::this.handleClose}>Закрыть</button>
					<div class="button small light button_file_upload">
						Загрузить другой файл
						<input type="file"
							   ref={input => this.fileUploadInput = input}
							   onChange={(ev) => onUploadFile(ev.target.files)}/>
					</div>
				</div>

				{/*{duplicates}*/}

			</div>
			{errors}
		</div>)
	}
}

const productShape = PropTypes.shape({
	barcode: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	rowNumber: PropTypes.number.isRequired
});

const errorShape = PropTypes.shape({
	error: PropTypes.string,
	duplicate: PropTypes.bool,
	rowNumber: PropTypes.number.isRequired
});

ProductImportReport.propTypes = {
	onUploadFile: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	report: PropTypes.shape({
		successCount: PropTypes.number.isRequired,
		failedCount: PropTypes.number.isRequired,
		ignoredSheets: PropTypes.array.isRequired,
		importResults: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			points: PropTypes.array.isRequired,
			duplicates: PropTypes.arrayOf(productShape).isRequired,
			success: PropTypes.arrayOf(productShape).isRequired,
			errors: PropTypes.arrayOf(errorShape).isRequired
		})).isRequired
	})
};

export default ProductImportReport;