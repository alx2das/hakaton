import React, {Component, PropTypes} from 'react'
import {pluralize} from 'common/helpers/stringHelper'


export default class RetryTimer extends Component {

	static propTypes = {
		onRepeat: PropTypes.func.isRequired,
		onFinalAction: PropTypes.func,
		maxSecond: PropTypes.number,
		timeMessage: PropTypes.string,
		repeatText: PropTypes.string
	};

	static defaultProps = {
		onFinalAction: () => {
		},
		maxSecond: 300,
		timeMessage: 'Получить новый код-смс через',
		repeatText: 'Получить новый код-смc'
	};

	constructor(props) {
		super(props);

		this.state = {
			secondsValue: this.props.maxSecond,
			timer: true
		};
	}

	componentDidMount() {
		this.time = setInterval(::this.tick, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.time);
	}

	tick() {
		const second = this.state.secondsValue - 1;

		if (second > 0)
			this.setState({secondsValue: second});
		else {
			this.setState({secondsValue: 0, timer: false});
			clearInterval(this.time);
			this.props.onFinalAction();
		}
	}

	getTime() {
		const {secondsValue} = this.state;

		const minutes = Math.floor(secondsValue / 60);
		const secondsEst = Math.floor(secondsValue - minutes * 60);

		const getMinuteText = (time) => pluralize(time, 'минуту', 'минуты', 'минут');
		const getSecondsText = (time) => pluralize(time, 'секунду', 'секунды', 'секунд');

		return (minutes > 0 ? (minutes + ' ' + getMinuteText(minutes) + ' ') : '') +
			secondsEst + ' ' + getSecondsText(secondsEst);
	}

	render() {
		const {onRepeat, timeMessage, repeatText} = this.props;

		if (!this.state.timer) {
			return <div className='send_pass_again'><a onClick={onRepeat}>{repeatText}</a></div>
		}
		return <div className='send_pass_again'>{timeMessage} {this.getTime()}</div>
	}

}