import 'babel-polyfill';
// import '../../../Markup.Kassa/markup/stylus/kassa_page_login.styl';
import {render} from 'react-dom'
import React from 'react'
import RootContainer from 'components/RootContainer'
import signInModules from 'modules/signInModules'
import configureRedux from 'redux/configureRedux.js'
import {Map} from 'immutable';
const mountNode = document.getElementById('root');

const initialState = Map();

const {store, routes, history}= configureRedux(signInModules, initialState);

render(<RootContainer store={store} routes={routes} history={history}/>, mountNode);

