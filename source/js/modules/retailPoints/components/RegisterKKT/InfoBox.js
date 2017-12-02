import React from 'react'
import {PrimaryButton} from 'common/uiElements'


export const InfoTheEndRegister = ({email, onClose}) => (
	<div className="page_content content_padding">
		<div className="center_xy page_center_info page_center_info__kkt_reg_report_sent">
			<i className="icon"/>
			<div className="title">Отчет о регистрации отправлен в ФНС</div>
			<div>
				Отчет распечатан на кассе. Обязательно сохраните отчет.<br />
				Изменения в статусе отчета будут отправлены на электронный<br />
				адрес {email} и телефон указанный при регистрации электронной подписи.
				За изменением статуса вы также можете следить в личном кабинете «МодульКассы».
			</div>
			<div className="form_buttons">
				<PrimaryButton className="button wide small" onClick={onClose}>Закрыть</PrimaryButton>
			</div>
		</div>
	</div>
);

export const LoadingStatementFNS = ({message = false}) => (
	<div className="page_content content_padding">
		<div className="center_xy">
			<div className="loading full big">
				<div>{message}</div>
			</div>
		</div>
	</div>
);

export const SuccessTransferOFD = ({email}) => (
	<div className="page_content">
		<div className="center_xy page_center_info page_center_info__kkt_submitted">
			<i className="icon"/>
			<div className="title">Заявление на регистрацию кассы успешно передано в ФНС</div>
			<div>
				Когда налоговая обработает заявление, мы отправим вам письмо на электронный адрес {email}<br />
				и СМС-сообщение на номер, указанный при регистрации электронной подписи.<br />
				За изменением статуса заявления вы также можете следить в личном кабинете МодульКассы.<br />
				Регистрация кассы завершится после обработки отчета.
			</div>
		</div>
	</div>
);

export const SuccessTransferFNS = ({email, phone}) => (
	<div className="page_content">
		<div className="center_xy page_center_info page_center_info__kkt_submitted">
			<i className="icon"/>
			<div className="title">Заявление на регистрацию кассы успешно передано в ФНС.</div>
			<div>
				Когда налоговая обработает заявление, мы отправим вам СМС -сообщение на номер {phone} и
				письмо на электронный адрес {email}. За изменением статуса заявления вы также
				можете следить в личном кабинете «МодульКассы».
			</div>
		</div>
	</div>
);

export const SuccessReportSent = ({email, phone}) => (
	<div className="page_content content_padding">
		<div className="center_xy page_center_info page_center_info__kkt_reg_report_sent">
			<i className="icon"/>
			<div className="title">Отчет о регистрации отправлен в ФНС</div>
			<div>
				Отчет распечатан на кассе. Обязательно сохраните отчет.<br/>
				Изменения в статусе отчета будут отправлены на электронный<br/>
				адрес {email} и телефон {phone}. За изменением статуса вы<br/>
				также можете следить в личном кабинете «МодульКассы».
			</div>
		</div>
	</div>
);

export const ErrorConnectOFD = ({repeatConnect}) => (
	<div className="page_content content_padding">
		<div className="center_xy page_center_info page_center_info__kkt_no_connect">
			<i className="icon"/>
			<div className="title">Ошибка</div>
			<div>
				Не удалось установить связь с ОФД.<br/>
				Пожалуйста, попробуйте повторить операцию позже
			</div>
			<div className="form_buttons row">
				<PrimaryButton
					className="button small"
					onClick={repeatConnect}>Повторить</PrimaryButton>
			</div>
		</div>
	</div>
);

export const SendReportFNS = ({onSendReport, onCloseLayout}) => (
	<div className="page_content">
		<div className="center_xy page_center_info page_center_info__kkt_submitted">
			<i className="icon"/>
			<div className="title">Отправьте в ФНС отчет о регистрации кассы</div>
			<div>
				Перед отправкой отчета убедитесь, что касса работает.<br/>
				<b>Обратите внимание!</b><br />
				<b>Все чеки, пробитые на кассе после отправки отчета, будут переданы в налоговую.</b>
			</div>
			<div className="form_buttons">
				<PrimaryButton
					className="button wide small"
					onClick={onSendReport}>Отправить</PrimaryButton>
				<PrimaryButton
					className="button wide small"
					onClick={onCloseLayout}>Отправить позже</PrimaryButton>
			</div>
		</div>
	</div>
);

export const ErrorCreateReport = ({repeatConnect}) => (
	<div className="page_content content_padding">
		<div className="center_xy page_center_info page_center_info__kkt_no_reg_report">
			<i className="icon"/>
			<div className="title">Ошибка</div>
			<div>
				Не удалось сформировать отчет о регистрации.<br/>
				Обратитесь в службу поддержки по телефону: 8(800)100-5454
			</div>
			<div className="form_buttons row">
				<PrimaryButton
					className="button small"
					onClick={repeatConnect}>Повторить</PrimaryButton>
			</div>
		</div>
	</div>
);

export const ErrorKassaConnect = ({repeatConnect}) => (
	<div className="page_content content_padding">
		<div className="center_xy page_center_info page_center_info__kkt_no_connect">
			<i className="icon"/>
			<div className="title">Ошибка</div>
			<div>
				Не удалось установить связь с кассой.<br/>
				Убедитесь, что касса работает
			</div>
			<div className="form_buttons row">
				<PrimaryButton
					className="button small"
					onClick={repeatConnect}>Повторить</PrimaryButton>
			</div>
		</div>
	</div>
);