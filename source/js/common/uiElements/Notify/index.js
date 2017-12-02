import * as notify from './actions';
import * as actionTypes from './actionTypes';
import * as reducer from './reducer';
import _NotifyService from './NotifyService';
import {connect} from 'react-redux';

const NotifyService = connect(
	state => ({notifications: state.get('notifications')}),
	dispatch => ({dispatch}))(_NotifyService);

export {notify, actionTypes, reducer, NotifyService}