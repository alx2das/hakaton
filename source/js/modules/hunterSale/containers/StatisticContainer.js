import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'
import {AmountFormat} from 'common/uiElements'
import {Line} from 'react-chartjs-2'

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

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },{
                label: '# of Votes',
                data: [2, 3, 6, 8, 1, 2, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

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
                    <Line data={data}/>
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