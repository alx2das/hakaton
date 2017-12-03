import React, {Component} from 'react'


export default class extends Component {

    render() {
        return (
            <div className="tabs_flat tabs_flat__h1">
                <a className="tab tab__active">Все точки</a>
                <a className="tab">Дмитровская точка</a>
                <a className="tab">Кофейная на ленина</a>
                <a className="tab">Кофейня на Балтийской</a>
                <a className="tab">бульвар славы</a>
            </div>
        )
    }

}