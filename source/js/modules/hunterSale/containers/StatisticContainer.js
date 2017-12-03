import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'
import {AmountFormat, LoaderPanel} from 'common/uiElements'
import {withRouter} from 'react-router'
import queryString from 'query-string'

import * as actions from '../actions/statisticActions'
import * as selector from '../selectors/statisticSelector'
import {getCurrentLocation} from '../../core/selectors'


function mapStateToProps(state) {
    const statisticState = selector.getStatisticSelector(state);
    const locationMap = getCurrentLocation(state);

    const location = locationMap.toJS();
    const searchParams = queryString.parse(location.search);

    return {statisticState, searchParams}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actGetRetailPoints: actions.getRetailPoints.request,
        actGetStatistics: actions.getStatistics.request
    }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends Component {
    componentDidMount() {
        const {searchParams, actGetRetailPoints} = this.props;
        actGetRetailPoints(searchParams);
    }

    onUpdPoint(pointID) {
        this.props.actGetStatistics(pointID);
    }

    render() {
        const {statisticState} = this.props;
        const actRPointID = statisticState.actRPointID;
        const rPoint = statisticState.rPoint.length && statisticState.rPoint || null;
        const challange = statisticState.statistics && statisticState.statistics.challange || [];
        const statisticItems = statisticState.statistics && statisticState.statistics.statisticItems || [];

        // const data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [{
        //         label: '# of Votes',
        //         data: [12, 19, 3, 5, 2, 3, 6],
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.2)',
        //             'rgba(54, 162, 235, 0.2)',
        //             'rgba(255, 206, 86, 0.2)',
        //             'rgba(75, 192, 192, 0.2)',
        //             'rgba(153, 102, 255, 0.2)',
        //             'rgba(255, 159, 64, 0.2)',
        //             'rgba(255, 206, 86, 0.2)',
        //         ],
        //         borderColor: [
        //             'rgba(255,99,132,1)',
        //             'rgba(54, 162, 235, 1)',
        //             'rgba(255, 206, 86, 1)',
        //             'rgba(75, 192, 192, 1)',
        //             'rgba(255, 206, 86, 0.2)',
        //             'rgba(153, 102, 255, 1)',
        //             'rgba(255, 159, 64, 1)'
        //         ],
        //         borderWidth: 1
        //     },{
        //         label: '# of Votes',
        //         data: [2, 3, 6, 8, 1, 2, 10],
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.2)',
        //             'rgba(54, 162, 235, 0.2)',
        //             'rgba(255, 206, 86, 0.2)',
        //             'rgba(75, 192, 192, 0.2)',
        //             'rgba(153, 102, 255, 0.2)',
        //             'rgba(255, 159, 64, 0.2)',
        //             'rgba(255, 206, 86, 0.2)',
        //         ],
        //         borderColor: [
        //             'rgba(255,99,132,1)',
        //             'rgba(54, 162, 235, 1)',
        //             'rgba(255, 206, 86, 1)',
        //             'rgba(75, 192, 192, 1)',
        //             'rgba(255, 206, 86, 0.2)',
        //             'rgba(153, 102, 255, 1)',
        //             'rgba(255, 159, 64, 1)'
        //         ],
        //         borderWidth: 1
        //     }]
        // };
        // console.log('-->', statisticState);

        return (
            <LoaderPanel loading={statisticState.pointsLoading}>
                <div className="title_panel">
                    <button className="button small icon-date light show_filter_panel" disabled={true}>Прошлая неделя</button>
                    <button className="button small icon-date light show_filter_panel">Текущая неделя</button>
                    <Link to={'/options'} className="button small light orange f_right">Настроить</Link>
                </div>
                {rPoint &&
                <div className="tabs_flat tabs_flat__h1">
                    {rPoint.map(item => (
                        <a className={`tab ${actRPointID === item.uuid ? 'tab__active' : ''}`}
                           onClick={() => this.onUpdPoint(item.accountId)}
                           key={item.uuid}>{item.name}</a>
                    ))}
                </div>}
                <LoaderPanel loading={!statisticState.pointsLoading && statisticState.pointLoading}>

                    {!!(challange.length) && challange
                        .filter(i => i.storeUuid === actRPointID)
                        .map((i, k) => (
                            <div key={k} className="box_stats">
                                <div className='bs_float'>
                                    <div className='bs_title'>Продажи (Текущие / План)</div>
                                    <div className='bs_info'>
                                        <AmountFormat value={i.maxAmount}/> <span className='sm'>/ <AmountFormat value={i.weekPlan}/></span>
                                    </div>
                                </div>
                                <div className='bs_float'>
                                    <div className='bs_title'>Средний чек (текущий / план)</div>
                                    <div className='bs_info'>
                                        <AmountFormat value={i.maxCheck / i.ctn}/> <span className='sm'>/ <AmountFormat value={i.avrCheckSum}/></span>
                                    </div>
                                </div>
                                <div className='bs_float'>
                                    <div className='bs_title'>Товаров в чеке (текущих / план)</div>
                                    <div className='bs_info'>
                                        {i.maxCount / i.ctn} <span className='sm'>/ {i.avrCheckPosition}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {/*<div className='box_chart'>
                        <Line data={data}/>
                    </div>*/}

                    {!!(statisticItems.length) &&
                    <div className="table table_contragents">
                        <div className="table_head">
                            <div className="contragent_name">Кассир</div>
                            <div className="contragent_name">Выручка</div>
                            <div className="contragent_role">Средний чек</div>
                            <div className="contragent_status">Кол-во продаж</div>
                            <div className="contragent_status">Карма</div>
                        </div>
                        {statisticItems
                            .filter(i => i.storeUuid === actRPointID)
                            .map((i, k) => (
                                <div key={k} className="table_row row_link">
                                    <div className="contragent_name">{i.cashierName}</div>
                                    <div className="contragent_name"><AmountFormat value={i.totalAmount}/></div>
                                    <div className="contragent_role"><AmountFormat value={i.avrCheck}/></div>
                                    <div className="contragent_status">{i.saleCount}</div>
                                    <div className="contragent_status">{i.karma}</div>
                                </div>
                            ))
                        }
                    </div>}
                </LoaderPanel>
            </LoaderPanel>
        )

    }
}