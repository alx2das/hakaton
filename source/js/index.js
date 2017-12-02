import 'babel-polyfill';
// import '../../../Markup.Kassa/markup/stylus/style_kassa.styl';
import {render} from 'react-dom'
import React from 'react'
import RootContainer from 'components/RootContainer'
import modules from 'modules/modules'
import configureRedux from 'redux/configureRedux.js'
import {Map} from 'immutable';

const mountNode = document.getElementById('root');
const initialState = Map();

const {store, routes, history}= configureRedux(modules, initialState);

render(<RootContainer store={store} routes={routes} history={history} />, mountNode);
