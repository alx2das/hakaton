import React from 'react'
import PropTypes from 'prop-types'
import {withRouter, Route} from 'react-router'
import {Switch} from 'react-router-dom'


@withRouter
export default class AppContainer extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired
    };

    render() {
        const {routes} = this.props;
        return (
            <Route path={'/hakaton/build/'}>
                <Switch>
                    {routes.map((p, index) => (
                        <Route
                            key={index}
                            exact={p.exact}
                            path={p.path}
                            component={p.component}
                        />
                    ))}
                </Switch>
            </Route>
        );
    }
}