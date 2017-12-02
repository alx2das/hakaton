import React from 'react'
import {Provider} from 'react-redux';
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router/immutable'
import AppContainer from './AppContainer'
import detectIE  from '../infrastructure/helpers/detectIE'

export default class RootContainer extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        routes: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <article>
                    <ConnectedRouter history={this.props.history}>
                        <AppContainer routes={this.props.routes}/>
                    </ConnectedRouter>
                    <ReactTooltip id="globalTooltip"/>
                </article>
            </Provider>
        );
    }
}
