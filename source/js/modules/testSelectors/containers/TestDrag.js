/**
 * Created by Cartman on 13/07/17.
 */
import React, {Component} from 'react';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Box from './Box';

export default class Container extends Component {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div>

					<Emptys/>
					<Keys/>

				</div>
			</DragDropContextProvider>
		);
	}
}

const BoxWrapper = () => {
	return (<div><Box name="Paper"/></div>)
}

const Emptys = () => {
	return (<div >
		<Dustbin />
		<Dustbin />
	</div>);
}

const Keys = () => {
	return (<div>{
		['Glass', 'Banana', 'Paper'].map(s => {
			return (<Box name={s}/>);
		})
	}</div>)
}