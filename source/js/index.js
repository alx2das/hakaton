import 'babel-polyfill'
import 'react-rangeslider/lib/index.css'
import '../../../Markup.Kassa/markup/stylus/style_kassa.styl'
import '../../markup/statistic.css'

import ReactDOM from 'react-dom'
import React from 'react'
import RootContainer from 'components/RootContainer'
import modules from 'modules/modules'
import configureRedux from 'redux/configureRedux.js'
import {Map} from 'immutable'


const {store, routes, history} = configureRedux(modules, Map());

ReactDOM.render(
    <RootContainer
        store={store}
        routes={routes}
        history={history}
    />,
    document.getElementById('root')
);
