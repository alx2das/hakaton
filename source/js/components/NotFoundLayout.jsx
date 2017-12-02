import React from 'react';
// import '../../../../Markup.Common/markup/stylus/404.styl';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

@connect((state) => ({}), (dispatch) => ({ dispatch }))
class NotFoundLayout extends React.Component {
    componentWillMount() {
        this.props.dispatch(push({pathname: '/'}));
    }
    render() {
        return (
            <div className="reg_var2">
                <div className="page4041">
                    <a href="#" className="logo">ModulBank</a>
                    <div className="content_wrap">
                        <div className="content_cell">
                            <div className="content">
                                <h1>СТРАНИЦА НЕ НАЙДЕНА</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(NotFoundLayout)

