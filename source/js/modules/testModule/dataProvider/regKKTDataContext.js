import api from 'infrastructure/api/api'


export const updateStatus = ({type, retailPointID, ...props}) => {
	return api.v1().retailpoint(retailPointID)
		.put(props)
		.then(res => ({
			retailPointID,
			kktStatus: res.data.kktStatus || '',
			registrationRequestStatus: res.data.registrationRequestStatus || '',
			kkmInfo: res.data.kkmInfo || {
				platform: '',
				modelId: '',
				modelName: '',
				vendorId: '',
				vendorName: '',
				serialNo: '',
				fnNo: ''
			}
		}));
}