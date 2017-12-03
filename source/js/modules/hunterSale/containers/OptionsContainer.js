import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'
import {Select} from 'common/uiElements'
import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'


function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            value: 10
        }
    }

    handleChangeStart = () => {
        console.log('Change event started')
    };

    handleChange = value => {
        this.setState({
            value: value
        })
    };

    handleChangeComplete = () => {
        console.log('Change event completed')
    };

    render() {
        const { value } = this.state;

        return (
            <div>

                <div className="title_panel">
                    <Link to={'/'} className="button small light orange f_right">К статистике</Link>
                </div>

                <div className="tabs_flat tabs_flat__h1">
                    <a className="tab tab__active">Охота за продажами</a>
                    <a className="tab">Темная карма</a>
                </div>

                <h3 className='opt_title'>План на неделю</h3>

                <div className='opt_box'>
                    <div className='opt_label'>Точка продаж</div>
                    <Select
                        className='w30'
                        options={[
                            {label: 'Первый нах'},
                            {label: 'Второй епт.'},
                            {label: 'Последний бля'}
                        ]}
                    />
                </div>

                <div className='opt_box'>
                    <div className='opt_label'>Желаемые продажи</div>
                    <Slider
                        min={0}
                        max={100}
                        value={value}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>

            </div>
        )

    }
}