import React, {Component} from 'react'
import Slider from 'react-rangeslider'
import {reduxForm} from 'common/formElements'
import {Select, AmountFormat, PrimaryButton} from 'common/uiElements'
import {AmountField, NumberField, SelectField, InputField, Field} from 'common/formElements/fields'


@reduxForm({form: 'optionsHS', reinitialize: true})
export default class extends Component {

    render() {
        const {handleSubmit, onSubmitForm, loading} = this.props;

        return (
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <h3 className='opt_title'>План на неделю</h3>

                <div className='box_stats'>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Пн</div>
                        <AmountField name="dayPlan1" className='w70'/>
                    </div>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Вт</div>
                        <AmountField name="dayPlan2" className='w70'/>
                    </div>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Ср</div>
                        <AmountField name="dayPlan3" className='w70'/>
                    </div>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Чт</div>
                        <AmountField name="dayPlan4" className='w70'/>
                    </div>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Пт</div>
                        <AmountField name="dayPlan5" className='w70'/>
                    </div>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Сб</div>
                        <AmountField name="dayPlan6" className='w70'/>
                    </div>
                    <div className='opt_box bs_float'>
                        <div className='opt_label'>Вс</div>
                        <AmountField name="dayPlan7" className='w70'/>
                    </div>
                </div>

                <div className='opt_box'>
                    <div className='opt_label'>Желаемый средний чек</div>
                    <AmountField name="weekPlan" className='w30'/>
                </div>

                <div className='opt_box'>
                    <div className='opt_label'>Желаемый кол-во товаров в чеке</div>
                    <NumberField name="avrCheckPosition" className='w30'/>
                </div>

                <div className='opt_box'>
                    <div className='opt_label'>Приз победителю</div>
                    <InputField name="prize" className='w70'/>
                </div>

                <div className='opt_box foot_btn'>
                    <PrimaryButton
                        className='button small light orange'
                        type="submit"
                        loading={loading}>Начать охоту за продажами</PrimaryButton>
                </div>
            </form>
        )
    }

}