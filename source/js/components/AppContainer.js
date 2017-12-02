import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import {withRouter} from 'react-router'


@withRouter
export default class AppContainer extends React.Component {

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