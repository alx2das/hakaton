import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'connected-react-router'


@connect(() => ({}), dispatch => bindActionCreators({push}, dispatch))
export default class extends Component {

    goNext() {
        this.props.push('/');
    }

    render() {
        return (
            <div>
                <h1>Home Two</h1>
                <a onClick={::this.goNext}>NEXT</a>
            </div>
        )
    }

}