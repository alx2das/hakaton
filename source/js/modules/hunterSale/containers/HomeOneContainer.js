import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class extends Component {

    render() {
        return (
            <div>
                <h1>Home One</h1>
                <Link to={'/two'}>NEXT</Link>
            </div>
        )
    }

}