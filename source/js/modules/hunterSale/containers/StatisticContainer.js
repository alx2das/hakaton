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
                <h1>StatisticContainer</h1>
                <Link to={'/options'}>Go Options</Link>
            </div>
        )

    }
}