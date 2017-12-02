import React from 'react';
import DefaultLayerLayout from 'components/DefaultLayerLayout';

class TestLayer2 extends DefaultLayerLayout {
	componentDidMount() {
		super.componentDidMount();
		logger.log('TestLayer componentDidMount',this.props.location.pathname)
	}

	render() {
		logger.log('TestLayer render', this.props.location.pathname)
		return (
			<article class="page" {...this.layerOptions}>
				<div class="page_header">
					{this.getCloseButton()}
					{this.getToggleButton()}
					<h1>Title</h1>
				</div>
				<div>Test {this.props.location.pathname} page {new Date().toTimeString()}</div>
			</article>)
	}
}


export default TestLayer2;