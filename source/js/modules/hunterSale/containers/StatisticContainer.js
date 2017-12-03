import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'

import * as actions from '../actions/statisticActions'
import * as selector from '../selectors/statisticSelector'


function mapStateToProps(state, ownProps) {
    const statisticState = selector.getStatisticSelector(state);

    return {statisticState}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actCheckConnect: actions.checkConnect.request
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends Component {
    componentDidMount() {
        this.props.actCheckConnect({hello: 'World'});
    }

    render() {
        const {statisticState} = this.props;

        console.log('-->', statisticState);

        return (
            <div>
                <div className="title_panel">
                    <a className="button small icon-date light show_filter_panel">Прошлая неделя</a>
                    <a className="button small icon-date light show_filter_panel">Текущая неделя</a>

                    <Link to={'/options'} className="button small light orange f_right">Настроить</Link>
                </div>

                <div className="tabs_flat tabs_flat__h1">
                    <a className="tab tab__active">Все точки</a>
                    <a className="tab">Дмитровская точка</a>
                    <a className="tab">Кофейная на ленина</a>
                    <a className="tab">Кофейня на Балтийской</a>
                    <a className="tab">бульвар славы</a>
                </div>

                <div className="box_stats">
                    <div className='bs_float'>
                        <div className='bs_title'>Продажи (Текущие/План)</div>
                        <div className='bs_info'>
                            12 000 руб. <span>/ 45 000 руб.</span>
                        </div>
                    </div>
                    <div className='bs_float'>
                        <div className='bs_title'>Средний чек (текущий / план)</div>
                        <div className='bs_info'>
                            450 руб. <span>/ 600 руб.</span>
                        </div>
                    </div>
                    <div className='bs_float'>
                        <div className='bs_title'>Товаров в чеке (текущих / план)</div>
                        <div className='bs_info'>
                            4 <span>/ 7</span>
                        </div>
                    </div>
                </div>

                <div className="table table_contragents">
                    <div className="table_head">
                        <div className="contragent_name">ФИО Касира</div>
                        <div className="contragent_name">Выручка</div>
                        <div className="contragent_role">Средний чек</div>
                        <div className="contragent_status">Кол-во продаж</div>
                        <div className="contragent_status">Карма</div>
                    </div>

                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name">65 000,00</div>
                        <div className="contragent_role">1000</div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name">65 000,00</div>
                        <div className="contragent_role">1000</div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name">65 000,00</div>
                        <div className="contragent_role">1000</div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name">65 000,00</div>
                        <div className="contragent_role">1000</div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name">65 000,00</div>
                        <div className="contragent_role">1000</div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                </div>
            </div>
        )

    }
}