import {showErrorBorder, showSuccessBorder, getErrorMessage, ifCondition, getRandomKey} from './formFieldHelpers'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import {focus} from 'redux-form/immutable'

/**
 * HOC для обертки над инпутами, чтобы получить необходимые методы подсветки ошибок и т.д.
 * getTooltipError - текст ошибки для тултипа
 * isError - флаг ошибки
 * isSuccess - флаг валидности поля
 * addClassName - css класс success|error
 * tooltip: tooltip - конфиг для тултипа, который внедреятся в <input/>
 *
 * tips - включены ли подскажи тултипа
 * dataOnWrapper - данные для фокусировки и отображению тултипа внедряются в оборачивающий элемент
 */
function radValidate({tips, dataOnWrapper}={tips: true, dataOnWrapper: false}) {
	return (WrappedComponent) => {
		class radValidateTooltip extends React.Component {

			constructor(props, context) {
				super(props, context);
				this.validatorId = getRandomKey();
				this.tooltipId = `tooltip_${this.validatorId}`;
			}

			getTooltipConfig({id, error}) {
				return {
					'data-for': id,
					'data-tip': ''
				};
			}

			componentDidUpdate(prevProps) {
				const {meta: {submitFailed, active, error}} = this.props;
				const {meta: {active: wasActive}} = prevProps;

				if (submitFailed && error && !wasActive && active) {
					setTimeout(() => {
						if (this.wrappedEl) {
							if (!this.wrappedEl.focusator)
								throw 'Component does not contain @focusator:IFocusableElement';
							this.wrappedEl.focusator.setFocus();
						}
					}, 0);
				}
			}


			inFocus() {
				const {meta: {active}}=this.props;
				return active
					||
					(this.wrappedEl
					&& this.wrappedEl.inFocus
					&& this.wrappedEl.inFocus());
			}

/*  		warnings
			getWarning = () => {
				const {meta: {warning}}=this.props;
				return warning;
			}

			showTooltipWarning() {
				const {meta: {warning, touched, error, submitFailed}}=this.props;
				return !error && warning;
			}

			getTooltipPropsWarning() {
				const self = this;
				return {
					html: true,
					multiline: true,
					getContent: [this.getWarning, 400],
					type: 'info',
					event: 'focus',
					eventOff: 'blur keydown',
					place: this.props.tipPlace || 'right',
					delayHide: 200,
					effect: 'solid',
					resizeHide: true
				}
			}
		{(showErrorMessage || showWarningMessage) &&
		<ReactTooltip id={this.tooltipId} {...(showErrorMessage ? this.getTooltipPropsError() : this.getTooltipPropsWarning())}/>}
		*/
			getError() {
				const {meta: {error}}=this.props;
				return error.text || error;
			}

			showTooltipError() {
				const {meta: {touched, error, submitFailed}}=this.props;
				return error && (submitFailed || touched);
			}

			getTooltipProps() {
				const self = this;
				return {
					html: true,
					multiline: true,
					getContent: [::self.getError, 400],
					type: 'error',
					event: 'focus',
					eventOff: 'blur keydown',
					place: this.props.tipPlace || 'right',
					delayHide: 200,
					effect: 'solid',
					resizeHide: true
				}
			}

			render() {
				const {
					meta:{touched, error, warning, active, dirty, valid, visited, submitFailed}, hideTips, wrapperClassName = ''
				}=this.props;

				const tooltip = this.getTooltipConfig({id: this.tooltipId, error});

				const highlightError = showErrorBorder({valid, error, active, visited, submitFailed});
				const highlightSuccess = showSuccessBorder({valid, visited, error, active});
				const additionalClassName = ifCondition(highlightError, ' error ') + ifCondition(highlightSuccess, ' success ');

				const validator = {
					error: error,
					isError: highlightError,
					isSuccess: highlightSuccess,
					addClassName: additionalClassName,
					tooltip: tooltip
				};

				if (tips && !hideTips) {
					const showErrorMessage = this.showTooltipError();
					return (
						<div className={wrapperClassName}>
							<WrappedComponent ref={wrappedEl => this.wrappedEl = wrappedEl} {...this.props}
											  validator={validator}/>
							{showErrorMessage &&
							<ReactTooltip id={this.tooltipId} {...this.getTooltipProps()}/>}
						</div>
					)
				} else {
					return <WrappedComponent ref={wrappedEl => this.wrappedEl = wrappedEl} {...this.props}
											 validator={validator}/>
				}

			}
		}

		return radValidateTooltip;
	}
}


export default radValidate;