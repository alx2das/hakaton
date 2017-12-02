import React from 'react'
import {Link} from 'react-router-dom'


class IndexMain extends React.Component {
    render() {
        return (
            <div>
                <h1>indexMain</h1>
                <Link to="/about">aboutMain</Link>
            </div>
        )
    }
}

class AboutMain extends React.Component {
    render() {
        return (
            <div>
                <h1>aboutMain</h1>
                <Link to="/">indexMain</Link>
            </div>
        )
    }
}


export default {
    indexMain: {
        path: '/',
        exact: true,
        component: IndexMain
    },
    aboutMain: {
        path: '/about',
        component: AboutMain
    }
}


