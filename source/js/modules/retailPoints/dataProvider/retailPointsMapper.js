/**
 * Created by RobertSabiryanov on 24.05.17.
 */
import {KKT_PLACE_DESC_BALANCE, KASSA_STATUS} from '../enums/registerKKTEnums';
import config from 'common/helpers/clientConfig'

export const toServer = (point) => {
	const result = {
		settings: {
			hardwareSettings: {
				printerSettings: {
					dataChannel: {rate: 115200},
					protocol: "dummy"
				}
			},
			checkSettings: {},
			egaisSettings: {
				kpp: point.settings.egaisSettings.kpp,
			},
			fiscalServiceEnabled: point.settings.fiscalServiceEnabled,
			defaultVatTag: point.settings.defaultVatTag
		},
		payments: {
			mock: {enabled: false},
			payme: {enabled: false}
		},
		name: point.name,
		address: point.address,
		fullAddress: point.fullAddress.toJS(),
		phone: point.phone,
		inn: point.inn,
		id: point.id
	};
	return result;
};

export const toClientList = (points) => {
	return points.map(point => toClient(point));
};

export const toClient = (point) => {
	const result = {
		...point,
		kktStatus: point.kktStatus || KASSA_STATUS.KKT_NOT_PLUGGED,
		fullAddress: point.fullAddress || {custom: false, address: point.address}
	};
	return result;
};


export const formOFD = {
	toServer: (form) => {
		const typesJS = form.retailPointTypes.toJS();

		let kktMode = form.kktMode || {};
		kktMode = kktMode.toJS && kktMode.toJS() || {};

		return ({
			requestData: {
				retailPointType: getRetailPoint(typesJS),
				retailPointTypes: typesJS,
				retailPointName: form.pointName,
				kktPlace: form.kktPlace,
				kktAddress: form.kktAddress.toJS(),
				taxMode: form.taxMode,
				secondaryTaxMode: form.secondaryTaxMode,
				kktMode: Object.keys(kktMode).filter(i => !!(kktMode[i])),
				kktFnsCode: form.kktFnsCode,
				responsiblePerson: form.responsiblePerson,
				fnsCode: form.fnsCode,
				ofdPinCode: form.ofdPinCode,
				selectedOFD: config.YandexOFD
			}
		});

		function getRetailPoint(types) {
			return Object.keys(types).reduce((prev, item) => {
				if (KKT_PLACE_DESC_BALANCE[item] > (KKT_PLACE_DESC_BALANCE[prev] || 0))
					return item;
				return prev;
			}, null);
		}
	},
	toClient: (form) => {
		return {
			requestData: form.requestData && mapperStepTwo(form.requestData) || {},
			company: form.ofdCompany && mapperCompany(form.ofdCompany) || {},
			ofdRegistration: form.ofdRegistration || {}
		};

		function mapperCompany(data) {
			return data
		}

		function mapperStepTwo(data) {
			let kktMode = {};
			if (data.kktMode.length) {
				data.kktMode.map(i => kktMode[i] = true);
			}
			return {
				...data,
				twoTaxMode: !!(data.taxMode && data.secondaryTaxMode),
				kktMode: kktMode
			}
		}
	}
};

export const sessionGET = {
	toClient: (response) => {
		return {
			active: !(response.status === 'INACTIVE'),
			phone: response.signer && response.signer.phone || '',
			email: response.signer && response.signer.email || ''
		}
	}
};
