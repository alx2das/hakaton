import {createAction} from "infrastructure/helpers/actionHelpers";
import {createRequestTypes} from "infrastructure/helpers/actionHelpers";

// ENUMS
export const SALES_REPORT = createRequestTypes('REPORT.SALES_REPORT');
export const RESET = 'REPORT.RESET';
export const ERROR_VALID_DATE = 'REPORT.ERROR_VALID_DATE';

// ACTIONS
export const salesReport = {
	request: ({beginDate, endDate, email}) => createAction(SALES_REPORT.REQUEST, {beginDate, endDate, email}),
	success: (props) => createAction(SALES_REPORT.SUCCESS, {props}),
	failure: ({error}) => createAction(SALES_REPORT.FAILURE, {error})
};

export const resetForm = () => createAction(RESET);

export const errorValidDate = () => createAction(ERROR_VALID_DATE);