import PropTypes from 'prop-types'
import DocPositionShape from './DocPositionShape'
import {DOCUMENT_STATUS} from '../../enums'
const {number, string}=PropTypes;

const statuses = Object.keys(DOCUMENT_STATUS).map(key => DOCUMENT_STATUS[key]);
export default PropTypes.shape({
	id: PropTypes.string,
	creationDateTime: PropTypes.instanceOf(Date).isRequired,
	docType: PropTypes.string,
	docSum: PropTypes.number,
	docNum: PropTypes.string,
	positions: PropTypes.arrayOf(DocPositionShape),
	status: PropTypes.oneOf(statuses).isRequired,
	fnState: PropTypes.any,
	fiscalInfo: PropTypes.shape({
		shiftNumber: number,
		checkNumber: number,
		kktNumber: string,
		fnNumber: string,
		fnDocNumber: number,
		fnDocMark: number,
		date: string,
		sum: number,
		checkType: string,
		qr: string,
	}),
	error: PropTypes.string,
});