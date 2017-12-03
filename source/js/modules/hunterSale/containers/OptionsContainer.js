import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toJS from 'components/HOC/toJs'
import {Link} from 'react-router-dom'
import {Select} from 'common/uiElements'


function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@toJS
export default class extends Component {
    render() {
        console.log('fullState', this.props);
        return (
            <div>

                <div className="title_panel">
                    <Link to={'/options'} className="button small light orange f_right">К статистике</Link>
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

            </div>
        )

    }
}