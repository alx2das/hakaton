import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'
import {AmountFormat} from 'common/uiElements'

import {LineChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

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
        const data = [
            {name: '1', uv: 590, pv: 800, amt: 3223},
            {name: '2', uv: 868, pv: 967, amt: 1223},
            {name: '3', uv: 1397, pv: 1098, amt: 123},
            {name: '4', uv: 1480, pv: 1200, amt: 1228},
            {name: '5', uv: 1520, pv: 1108, amt: 2334},
            {name: '6', uv: 1480, pv: 1200, amt: 1228},
            {name: '7', uv: 1520, pv: 1108, amt: 543},
            {name: '8', uv: 1400, pv: 680, amt: 1223}
        ];

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
                            <AmountFormat value='12000'/> <span>/ <AmountFormat value='45000'/></span>
                        </div>
                    </div>
                    <div className='bs_float'>
                        <div className='bs_title'>Средний чек (текущий / план)</div>
                        <div className='bs_info'>
                            <AmountFormat value='450'/> <span>/ <AmountFormat value='600'/></span>
                        </div>
                    </div>
                    <div className='bs_float'>
                        <div className='bs_title'>Товаров в чеке (текущих / план)</div>
                        <div className='bs_info'>
                            4 <span>/ 7</span>
                        </div>
                    </div>
                </div>

                <div className='box_chart'>
                    <LineChart width={800} height={300} data={data}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="atm" stroke="#82ca9d" />
                    </LineChart>
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
                        <div className="contragent_name"><AmountFormat value='65000,00'/></div>
                        <div className="contragent_role"><AmountFormat value='1000,00'/></div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name"><AmountFormat value='65000,00'/></div>
                        <div className="contragent_role"><AmountFormat value='1000,00'/></div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name"><AmountFormat value='65000,00'/></div>
                        <div className="contragent_role"><AmountFormat value='1000,00'/></div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name"><AmountFormat value='65000,00'/></div>
                        <div className="contragent_role"><AmountFormat value='1000,00'/></div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                    <div className="table_row row_link">
                        <div className="contragent_name">Матросов Матрос</div>
                        <div className="contragent_name"><AmountFormat value='65000,00'/></div>
                        <div className="contragent_role"><AmountFormat value='1000,00'/></div>
                        <div className="contragent_status">150</div>
                        <div className="contragent_status">300</div>
                    </div>
                </div>
            </div>
        )

    }
}