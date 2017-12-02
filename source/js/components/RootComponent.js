import React, {Component} from 'react'

import PageComponent from './PageComponent'
import modules from '../modules/indexModules'
import * as configureApp from '../helpers/configureApp'


const routes = configureApp.getRoutes(modules);

export default class RootComponent extends Component {
    render() {

        console.log(routes);

        return (
            <PageComponent routes={routes}/>
        )
    }
}