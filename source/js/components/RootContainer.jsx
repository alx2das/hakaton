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
                <div className="poss">
                    <ConnectedRouter history={this.props.history}>
                        <AppContainer appReady={false} routes={this.props.routes}/>
                    </ConnectedRouter>
                    {this.renderDevTools()}
                    {this.renderServices()}
                </div>
            </Provider>
        );
    }

    renderServices() {
        return (<ReactTooltip id="globalTooltip"/>);
    }

    renderDevTools() {
        let devTools = false;
        if (__DEV_TOOLS__ && !window.devToolsExtension) {
            const DevTools = require('../dev/DevTools.jsx').default;
            devTools = (<DevTools />)
        }

        return devTools;
    }

    renderHotFix() {

        // try {
        //     if (detectIE() >= 9) {
        //         const css = `article.page.open {
        //         transform: none!important;
        //         -webkit-transform: none!important;
        //         -moz-transform: none!important;
        //         -o-transform: none!important;
        //         -ms-transform: none!important;
        //         }`;
        //         return (<style>{css}</style>)
        //     }
        // } catch (ex) {
        //     return null
        // }
        return null;
    }
}
