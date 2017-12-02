/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Field, formValueSelector, change} from 'redux-form/immutable';
import {reduxForm} from 'common/formElements';
import {LoaderPanel} from 'common/uiElements';
import {PhoneField, InputField, normalizeKpp, normalizeInn, SelectField, SearchField} from 'common/formElements/fields';
import {isCorrectInn, isCorrectKpp, isEmpty, isRequired} from 'common/validators';
import RetailPointShape from '../RetailPointShape';
import NextPointSettings from './NextPointSettings';
import {VAT_TAG_OPTIONS} from 'modules/core/productEnums';
import StatusRegKKT from '../RegisterKKT/SatatusReg'
import StatusRetailPoint from '../RegisterKKT/StatusRetailPoint'
import * as enumsKKT from '../../enums/registerKKTEnums'

const isRequiredKpp = (text) => (val, isIP) => (!isIP && isEmpty(val)) ? text : undefined;
const validateInn = (text) => (val) => !isCorrectInn(val) ? text : undefined;
const validateKpp = (text) => (val) => !isCorrectKpp(val) ? text : undefined;
const validateMinLength = (text) => (val) => val.length < 10 ? text : undefined;
const requiredAddressValidate = (text) => (val) => val && val.get && val.get('address') ? undefined : text;
const selectListValidate = (text) => (val) => val && val.get && !val.get('custom') && !(val.get('region')
    || val.get('city') || val.get('street') || val.get('house') || val.get('block') || val.get('flat')) ? text : undefined;

class RetailPointForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isIP) {
            this.props.dispatch(change('retailPointForm', 'kpp', null));
        }
    }

    render() {
        const {onSave, onCancel, onDelete, points, loading, id, retailPoint, loadingToken, actSendReport} = this.props;
        const {handleSubmit, submitting, isIP, productsSource, showProductSources, showDelete, onOpenLayerRegKKT, installPosLinkToken} = this.props;
        const vatTags = VAT_TAG_OPTIONS.filter(s => s.value !== '0');
        const showStatusKassa = id && retailPoint && retailPoint.kktStatus !== enumsKKT.KASSA_STATUS.KKT_NOT_PLUGGED;
        const showDelBtn = showDelete && enumsKKT.OK_DELETE_RP.includes(retailPoint.registrationRequestStatus);

        return (<form onSubmit={handleSubmit(onSave)} className="poss" autoComplete="off">
            <LoaderPanel loading={loading} className="page_content  with_bottom_panel  content_padding">

                {id &&
                <StatusRetailPoint
                    point={retailPoint}
                    statuses={{
                        kktStatus: retailPoint.kktStatus,
                        registrationRequestStatus: retailPoint.registrationRequestStatus
                    }}
                    loading={loadingToken}
                    generateCode={installPosLinkToken}
                />}

                {showStatusKassa &&
                <StatusRegKKT point={retailPoint}
                              retailPointID={id}
                              actSendReport={actSendReport}
                              statuses={{
                                  kktStatus: retailPoint.kktStatus,
                                  registrationRequestStatus: retailPoint.registrationRequestStatus
                              }}
                              onOpenLayerRegKKT={onOpenLayerRegKKT}/>}

                {showProductSources &&
                <NextPointSettings points={points} productsSource={productsSource}/>}

                {id &&
                <div className="form_group form_horizontal">
                    <div className="property_label col three">Идентификатор</div>
                    <div className="property_value col nine">
                        <div className="c_grey36 m_top_15 f_small">{id}</div>
                    </div>
                </div>
                }

                <div className="form_group form_horizontal">
                    <div className="property_label col three">Название</div>
                    <div className="property_value col nine">
                        <InputField name="name" type="text" maxLength="255"
                                    className="w100"
                                    required="Укажите название торговой точки"
                        />
                    </div>
                </div>
                <div className="form_group form_horizontal">
                    <div className="property_label col three">Адрес</div>
                    <div className="property_value col nine">
                        <SearchField
                            name='fullAddress'
                            className='small w100'
                            tipPlace="top"
                            requiredFields={{
                                city: 'Укажите город',
                                street: 'Укажите улицу',
                                house: 'Укажите дом'
                            }}
                            validate={[
                                requiredAddressValidate('Укажите адрес установки кассы'),
                                selectListValidate('Выберите адрес из списка')
                            ]}
                        />
                    </div>
                </div>

                <div className="form_group form_horizontal">
                    <div className="property_label col three">Телефон</div>
                    <div className="property_value col w35">
                        <div className="input_group">
                            <div className="input_group_addon f_normal">+7</div>
                            <PhoneField name="phone" className="w100"
                                        validate={[
                                            isRequired('Укажите номер мобильного телефона'),
                                            validateMinLength('Укажите 10 цифр номера мобильного телефона')
                                        ]}/>
                        </div>
                    </div>
                </div>

                <div className="form_group form_horizontal">
                    <div className="property_label col three">ИНН</div>
                    <div className="property_value col w35">
                        <InputField name="inn" type="text" maxLength="12"
                                    className="w100"
                                    validate={[isRequired('Укажите ИНН'), validateInn('Не совпадают контрольные цифры ИНН')]}
                                    normalize={normalizeInn}/>
                    </div>
                </div>

                <div className="form_group form_horizontal">
                    <div className="property_label col three">КПП</div>
                    <div className="property_value col w35">
                        <InputField name="settings.egaisSettings.kpp" type="text" maxlength="9"
                                    className="w100"
                                    validate={[isRequiredKpp('Укажите КПП', isIP), validateKpp('КПП должен содержать 9 цифры')]}
                                    normalize={normalizeKpp} disabled={isIP}/>
                    </div>
                </div>

                <div className="form_group form_horizontal">
                    <div className="property_label col three">Ставка НДС
                        <div className="f_xsmall">по умолчанию</div>
                    </div>
                    <div className="property_value col w35">
                        <SelectField className="w100"
                                     name="settings.defaultVatTag"
                                     clearable={false}
                                     required="Укажите ставку НДС"
                                     options={vatTags}/>
                    </div>
                </div>

                <div className="form_group form_horizontal mt24">
                    <div className="property_value col nine">
                        <Field id="fiscalServiceEnabled" name="settings.fiscalServiceEnabled" type="checkbox"
                               component="input"/>
                        <label for="fiscalServiceEnabled" className="label_check">
                            <i className="icon"></i>
                            <span className="f_small">Использовать для печати документов интернет-магазина</span>
                        </label>
                    </div>
                </div>

                {productsSource === 'BLANK' && <div className="form_group form_horizontal mt24">
                    <Field name="demoProducts" id="demoProducts" component="input" type="checkbox"/>
                    <label for="demoProducts" className="label_check"><i className="icon"></i><span className="f_small">Заполнить демо-товарами</span></label>
                </div>}
            </LoaderPanel>
            <div className="page_bottom_panel">
                <button disabled={submitting} className="button middle wide" type="submit">Сохранить
                </button>
                <a className="button middle wide clean" onClick={onCancel}>Отмена</a>
                {showDelBtn &&
                <a className="button middle wide clean mr44 f_right" onClick={onDelete}>Удалить точку</a>}
            </div>
        </form>)
    }
}

RetailPointForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onOpenLayerRegKKT: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    points: PropTypes.arrayOf(RetailPointShape),
    retailPoint: RetailPointShape,
    loadingToken: PropTypes.bool
};

RetailPointForm = reduxForm({
    form: 'retailPointForm'
})(RetailPointForm);

const selector = formValueSelector('retailPointForm');
RetailPointForm = connect(
    (state, props) => {
        const productsSource = selector(state, 'productsSource');
        const inn = selector(state, 'inn');
        const isIP = inn && inn.length === 12;
        const initialValues = props.retailPoint;
        // если нет fiasAddress, значит старый пользователь, надо подговтовить данные
/*        if (initialValues && initialValues.address && !initialValues.fullAddress) {
            initialValues.fullAddress = {
                custom: false,
                value: initialValues.address
            };
        }*/
        const points = props.points;
        const showProductSources = points && points.length > 0 && (initialValues && initialValues.isNew);
        const showDelete = initialValues && !initialValues.isNew;
        const id = showDelete && initialValues && initialValues.id;
        return {
            isIP,
            productsSource,
            showProductSources,
            showDelete,
            initialValues,
            id
        }
    }
)(RetailPointForm);

export default RetailPointForm