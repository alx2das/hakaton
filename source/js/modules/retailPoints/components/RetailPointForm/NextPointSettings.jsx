/**
 * Created by RobertSabiryanov on 12.06.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form/immutable';
import {SelectField} from 'common/formElements/fields';
import {isRequired} from 'common/validators';
import RetailPointShape from '../RetailPointShape';
import productSources from '../../enums/productSourcesEnum';

class NextPointSettings extends React.Component {
    render() {
        const {points, productsSource} = this.props;
        return (<div class="form_group form_horizontal">
            <div class="mb16">
                <Field type="radio" component="input" name="productsSource" id="11" value={productSources.BLANK}/>
                <label for="11" class="label_check"><i class="icon"></i><span>Новый список товаров</span></label>
            </div>

            <div class="selected_item  mb16">
                <Field type="radio" component="input" name="productsSource" id="12" value={productSources.SHARE}/>
                <label for="12" class="label_check"><i
                    class="icon"></i><span>Использовать товары и данные другой точки</span></label>

                {productsSource === productSources.SHARE && <div class="inner_select  mt8">
                    <div class="form_group form_horizontal  mb8">
                        <div class="jsRadSelect2  w100" data-placeholder="Селект" name="existsPoints" id="existsPoints">
                            <SelectField name="retailPoints" className="w100"
                                         placeholder="Выберите торговую точку"
                                         valueKey="id"
                                         labelKey="name"
                                         options={points}
                                         required="Выберите точку продаж"/>
                        </div>
                    </div>
                    <div class="info_text icon-info f_xsmall">Все изменения по товарам, сделанные в одной из этих точек,
                        будут отражены также в другой точке
                    </div>
                </div>}
            </div>

            <div class="mb20">
                <Field type="radio" component="input" name="productsSource" id="13" value={productSources.COPY}/>
                <label for="13" class="label_check"><i class="icon"></i><span>Скопировать товары</span></label>

                {productsSource === productSources.COPY && <div class="inner_select  mt8">
                    <div class="form_group form_horizontal  mb8">
                        <div class="jsRadSelect2  w100" data-placeholder="Селект" name="existsPoints" id="existsPoints">
                            <SelectField name="retailPoints" className="w100"
                                         placeholder="Выберите торговую точку"
                                         valueKey="id"
                                         labelKey="name"
                                         options={points}
                                         required="Выберите точку продаж"/>
                        </div>
                    </div>
                    <div class="info_text icon-info f_xsmall">Изменения товаров одной точки НЕ будут отражены на товарах
                        другой точки
                    </div>
                </div>}
            </div>
        </div>)
    }
}

NextPointSettings.propTypes = {
    points: PropTypes.arrayOf(RetailPointShape),
    productsSource: PropTypes.string
};

export default NextPointSettings