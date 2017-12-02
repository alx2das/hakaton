import {generateNumber} from 'infrastructure/utils/uuidGenerator';

export const getListContragent = {
	toServer: (props) => {
		let params = {};

		if (props.q) params.q = props.q;
		if (props.sortField) params.sortField = props.sortField;
		if (props.sortDirection) params.sortDirection = props.sortDirection;
		if (props.pos) params.start = props.pos;
		if (props.isCashier) params.isCashier = props.isCashier;

		return params;
	},
	toClient: (response) => ({
		data: (response.data || []).map(res => ({
			code: res.code,
			locked: res.locked ? "on" : "off",
			login: res.login,
			name: res.name,
			password: res.password,
			roles: res.roles || []
		})),
		pos: response.pos,
		total_count: response.total_count
	})
};

export const editContragentToServer = ({isNew, ...props}) => ({
	catalogType: 'CONTRACTOR',
	code: isNew ? generateNumber().toString() : props.code,
	locked: props.locked === 'off' ? 0 : 1,
	name: props.name,
	password: props.password,
	roles: props.roles  || []
});