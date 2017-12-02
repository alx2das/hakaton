import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import * as reducer from './immutable-reducer';
import _NotifyService from '../NotifyService';
import toJS from './immutableParser';
import {connect} from 'react-redux';

const NotifyService = connect(
	state => ({notifications: state.get('notifications')}),
	dispatch => ({dispatch}))(toJS(_NotifyService));

export {actions, actionTypes, reducer, NotifyService}