import React from 'react';
import {Link} from 'react-router-dom'

class TestLayers extends React.Component {
	componentDidMount() {
		logger.log('TestLayerList componentDidMount')
	}

	render() {
		logger.log('TestLayerList render')
		return (
			<div>
				<div>Test layers page</div>
				<Link to='/layer1'>Layer 1</Link>
				<br/>
				<Link to='/layer2'>Layer 2</Link>
				<br/>
				<Link to='/layer3'>Layer 3</Link>
				<br/>
				<Link to='/layer4'>Layer 4</Link>
				<br/>
				<Link to='/layer5'>Layer 5</Link>

			</div>)
	}
}


export default TestLayers;