import React from 'react'

class HotKeyEmpty extends React.Component {
	render() {
		const {className = ''}=this.props;
		return (
			<div className={className}>
				<div className="cell">
				</div>
			</div>);
	};
}

export default HotKeyEmpty;

