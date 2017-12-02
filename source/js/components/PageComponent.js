import React, {Component} from 'react'
import {HashRouter, Route} from 'react-router-dom'


export default class PageComponent extends Component {
    render() {
        const {routes} = this.props;

        return (
            <HashRouter>
                <div>
                    {routes.map((p, index) => (
                        <Route
                            key={index}
                            exact={p.exact}
                            path={p.path}
                            component={p.component}
                        />
                    ))}
                </div>
            </HashRouter>
        )
    }
}