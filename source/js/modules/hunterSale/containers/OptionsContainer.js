import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'
import queryString from 'query-string'

import OptionsFormComponent from '../components/OptionsFormComponent'
import * as actions from '../actions/optionsActions'
import * as selector from '../selectors/optionsSelector'
import {getCurrentLocation} from '../../core/selectors'


function mapStateToProps(state) {
    const optionsState = selector.getOptionsSelector(state);
    const locationMap = getCurrentLocation(state);

    const location = locationMap.toJS();
    const searchParams = queryString.parse(location.search);

    return {searchParams, optionsState}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actGetOptions: actions.getOptions.request,
        actSaveOptions: actions.saveOptions.request
    }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends Component {

    componentDidMount() {
        const {searchParams, actGetOptions} = this.props;
        actGetOptions(searchParams)
    }

    onSubmitForm(props) {
        this.props.actSaveOptions(props && props.toJS && props.toJS());
    }

    render() {
        const {optionsState} = this.props;

        return (
            <div>
                <div className="title_panel">
                    <Link to={'/'} className="button small light orange f_right">К статистике</Link>
                </div>
                <div className="tabs_flat tabs_flat__h1">
                    <a className="tab tab__active">Охота за продажами</a>
                </div>

                {!optionsState.loading &&
                <OptionsFormComponent
                    initialValues={optionsState.options}
                    options={optionsState.options}
                    onSubmitForm={::this.onSubmitForm}
                    loading={optionsState.saving}
                />}
            </div>

        )

    }
}