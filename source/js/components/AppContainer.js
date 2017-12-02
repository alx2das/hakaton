import React from 'react'
import PropTypes from 'prop-types'
import {withRouter, Route} from 'react-router'
import {Switch} from 'react-router-dom'
import config from 'common/helpers/clientConfig'


@withRouter
export default class AppContainer extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired
    };

    render() {
        const {routes} = this.props;

        console.log(config);

        return (
            <Switch>
                {routes.map((p, index) => (
                    <Route
                        key={index}
                        exact={`${config.GITHUB_PAGES}${p.exact}`}
                        path={p.path}
                        component={p.component}
                    />
                ))}
            </Switch>
        );
    }
}