import React from 'react';
import SignInForm from '../components/SignInForm'
import {connect} from 'react-redux';
import {login, resetLogin} from '../actions/loginActions'
import {bindActionCreators} from 'redux';
import {getSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import ModulHeader from 'components/ModulHeader';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import modules from 'modules/modules';
import { matchPath } from 'react-router'

const REDIRECT_URL = '/retail-points'; // страница для редиректа по умолчанию, после успешной авторизации

function normalizePath(path) {
    if (!path && typeof path != 'string')
        return '/';
    if (path.charAt(0) !== '/') {
        return '/' + path;
    }
    return path;
}
function checkPathInRoutes(searchPath) {
    // импортируем все модули, получаем роуты и через matchPath проверяем существование пути в роуте. Так же смотрим вложения nested.
    return !!modules.find((module) => {
        if (module.getRoutes) {
            return Object.values(module.getRoutes()).find((route) => {
                const iter = matchPath(searchPath, route);
                if (iter && iter.path && iter.path != '/')
                    return true;
                else if (route.nested) {
                    return Object.values(route.nested).find((nest) => {
                        const nestIter = matchPath(searchPath, nest);
                        return nestIter && nestIter.path && nestIter.path != '/'
                    });
                } else
                    return false;
            })
        }
        return false;
    });
}
class SignInContainer extends React.Component {
    constructor(props) {
        super(props);
        this.redirectUrl = normalizePath(props.redirectUrl);
    }
    componentDidMount() {
        this.props.resetLogin();
    }

    componentWillMount() {
        if (this.redirectUrl == '/' && !checkPathInRoutes(this.redirectUrl))     { // проверка на существование пути в роуте
            this.redirectUrl = REDIRECT_URL;
        }
    }

    handleLogin(props) {
        this.props.login(props.get('email'), props.get('password'), this.redirectUrl);
    }

    render() {
        const {loading, errors}=this.props;
        return (
            <div class="login">
                <ModulHeader/>
                <div className="login_section">
                    <div className="login_section_center">
                        <SignInForm onLogin={::this.handleLogin}
                                    errors={errors}
                                    redirectUrl={this.redirectUrl}
                                    loading={loading}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(SignInContainer));


function mapStateToProps(state, ownProps) {
    const parse = (ownProps.location.search && queryString.parse(ownProps.location.search)) || null;
    return {
        loading: getSection(state).get('loading'),
        errors: getSection(state).get('authError'),
        redirectUrl: parse && parse.redirectUrl
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login.request, dispatch),
        resetLogin: bindActionCreators(resetLogin, dispatch),
    }
}
