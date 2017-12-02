/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toJs from 'components/HOC/toJs'
import {push} from 'connected-react-router'
import ShowPosLinkToken from '../components/RegisterKKT/ShowPosLinkToken';

import {
    addRetailPoint,
    setEmptyRetailPointInLayer,
    getRetailPoint,
    editRetailPoint,
    deleteRetailPoint,
} from '../actions/retailPointActions';
import * as regKKTActions from '../actions/registerKKTActions'
import {getRetailPointList, getRetailPointInLayer} from '../selectors/retailPointSelectors';
import {getLoadingInstallToken} from '../selectors/registerKKTSelectors';

import DefaultLayerLayout from 'components/DefaultLayerLayout';
import RetailPointForm from '../components/RetailPointForm/RetailPointForm';
import {ConfirmPopupService} from 'common/uiElements';

@toJs
class AddEditRetailPointContainer extends DefaultLayerLayout {
    componentDidMount() {
        super.componentDidMount();
        const {id, action, points, setEmptyRetailPointInLayer, getRetailPoint} = this.props;
        if (action === 'edit' || action === 'postoken') {
            getRetailPoint(id);
        } else if (action === 'add') {
            const isFirstPoint = !points || points.length === 0;
            setEmptyRetailPointInLayer(id, isFirstPoint);
        }

    }

    onSave(props) {
        // return null;
        //
        let retailPoint = {
            name: props.get('name'),
            address: props.getIn(['fullAddress', 'address']),
            fullAddress: props.get('fullAddress'),
            phone: props.get('phone'),
            inn: props.get('inn'),

            mock: {
                enabled: props.get('demoProducts'),
            },
            type: props.get('productsSource'),
            source: props.get('retailPoints'),
            id: props.get('id'),
            isNew: props.get('isNew'),
            settings: {
                egaisSettings: {
                    kpp: props.getIn(['settings', 'egaisSettings', 'kpp']),
                },
                defaultVatTag: props.getIn(['settings', 'defaultVatTag']),
                fiscalServiceEnabled: props.getIn(['settings', 'fiscalServiceEnabled'])
            }
        };

        const {addRetailPoint, editRetailPoint} = this.props;
        if (retailPoint.isNew) {
            addRetailPoint(retailPoint);
        } else {
            editRetailPoint(retailPoint);
        }

        this.closeLayer();
    }

    onDelete() {
        const {id, deleteRetailPoint} = this.props;
        this.confirmPopup.open()
            .then(() => {
                deleteRetailPoint(id);
                this.closeLayer();
            });
    }

    onOpenLayerRegKKT() {
        const {actOpenRegKKT, id} = this.props;
        actOpenRegKKT({retailPointID: id});
    }

    installPosLinkToken() {
        const {installPosLinkToken, id} = this.props;
        this.confirmGenerateCode
            .open()
            .then(() => {
                installPosLinkToken({retailPointID: id});
            });
    }

    render() {
        const {id, points, initialValues, installPosLinkToken, action, actSendReport} = this.props;
        const layer = initialValues[id];
        const retailPoint = layer && layer.retailPoint;
        const loading = layer && layer.loading;
        const loadingToken = layer && layer.loadingToken;
        const h1Title = retailPoint && retailPoint.isNew ? 'Добавление точки продаж' : 'Редактирование точки продаж';

        if (action == 'postoken') {
            return (
                <article class="page" {...this.layerOptions}>
                    <div class="page_header">
                        {this.getCloseButton()}
                        {this.getToggleButton()}
                        <h1>Добавление точки продаж</h1>
                    </div>
                    <ShowPosLinkToken loading={loading} retailPointId={retailPoint && retailPoint.id} token={retailPoint && retailPoint.posLinkToken} closeLayer={() => this.closeLayer()} />
                </article>)
        }

        return (
            <article class="page" {...this.layerOptions}>
                <div class="page_header">
                    {this.getCloseButton()}
                    {this.getToggleButton()}
                    <h1>{h1Title}</h1>
                </div>
                <RetailPointForm onSave={::this.onSave}
                                 onCancel={::this.closeLayer}
                                 onOpenLayerRegKKT={::this.onOpenLayerRegKKT}
                                 actSendReport={actSendReport}
                                 loading={loading}
                                 loadingToken={loadingToken}
                                 points={points}
                                 retailPoint={retailPoint}
                                 onDelete={::this.onDelete}
                                 installPosLinkToken={::this.installPosLinkToken}
                />
                <ConfirmPopupService
                    ref={p => this.confirmPopup = p}
                    okName="Подтвердить"
                    cancelName="Отмена"
                    title="Удалить точку продаж?"
                    text="Все созданные товары и другие данные этой точки будут удалены. Вы хотите подтвердить операцию?"/>
                <ConfirmPopupService
                    ref={p => this.confirmGenerateCode = p}
                    okName='Создать код активации'
                    cancelName='Отмена'
                    title='Вы уверены?'
                    text={
                        `Чеки, которые касса не отправила в личный кабинет МодульКассы, будут утеряны.
                        Проверьте очередь чеков на отправку.
                        Для этого запустите МодульКассу → Откройте «Меню» → Сервис → Документов в очереди на отправку`
                    }/>
            </article>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const {action, id} = ownProps.computedMatch.params;
    return {
        id,
        action,
        points: getRetailPointList(state),
        initialValues: getRetailPointInLayer(state),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            addRetailPoint: addRetailPoint.request,
            editRetailPoint: editRetailPoint.request,
            setEmptyRetailPointInLayer: setEmptyRetailPointInLayer,
            getRetailPoint: getRetailPoint.request,
            deleteRetailPoint: deleteRetailPoint.request,
            actOpenRegKKT: regKKTActions.openRegKKT.request,
            installPosLinkToken: regKKTActions.installPosLinkToken.request,
            actSendReport: regKKTActions.sendReport,
            push
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRetailPointContainer);