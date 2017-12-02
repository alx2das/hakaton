/**
 * Created by RobertSabiryanov on 31.10.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import toJs from 'components/HOC/toJs'
import Intercom from 'react-intercom';
import {getRetailPointList, getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {getAuthData} from 'modules/account/selectors/accountSelectors';


@connect((state) => ({
    points: getRetailPointList(state),
    selectedPointId: getCurrentRetailPointId(state),
    userData: () => {
        let authData = getAuthData(state);
        let user = authData && authData.get('user');
        return user && {
            id: user.get('email'),
            email: user.get('email'),
            name: user.get('name')
        }
    },
}))
@toJs
class IntercomChat extends React.Component {
    static propTypes = {
        appID: PropTypes.string.isRequired
    };

    render() {
        const userData = this.props.userData();
        const {points, selectedPointId} = this.props;
        if (!selectedPointId) {
            return null;
        }
        const selectedPointArr = points && points.filter(point => point.id === selectedPointId);
        const selectedPoint = selectedPointArr && selectedPointArr.length > 0 && selectedPointArr[0];
        const user = {
            user_id: userData && userData.id,
            email: userData && userData.email,
            name: userData && userData.name,
            "ИНН": selectedPoint.inn,
            "Телефон": selectedPoint.phone,
            "Модель_ККТ": selectedPoint.kkmInfo && selectedPoint.kkmInfo.modelName,
            "Платформа": selectedPoint.kkmInfo && selectedPoint.kkmInfo.platform,
            "Серийный_номер_ККТ": selectedPoint.kkmInfo && selectedPoint.kkmInfo.serialNo,
            "Серийный_номер_ФН": selectedPoint.kkmInfo && selectedPoint.kkmInfo.fnNo
        };

        return <Intercom appID={this.props.appID} {...user} />
    }
}

export default IntercomChat;