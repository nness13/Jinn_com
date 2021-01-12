import React from "react";
import {connect} from "react-redux";
import {getAuthData, loginTC} from '../../authReducer';
import {Redirect} from "react-router-dom";

import styleC from '../../../../styles/Container.module.css';
import css from '../register/Register.module.css';
import LoginReduxForm from './LoginForm';
import {NavLink} from 'react-router-dom';
import Preloader from '../../../common/preloader/Preloader';

const LoginContainer = props => {
    const {isAuth, loginTC, isFetching} = props

    return isAuth
        ? <Redirect to={"/profile"}/>
        : <Login onSubmit={loginTC} isFetching={isFetching}/>
}


export default connect(state => ({
    isAuth: getAuthData(state).isAuth,
    isFetching: false
}), {loginTC})(LoginContainer);



const Login = (props) => {
    const {onSubmit, isFetching} = props

    return isFetching
        ? <div className={styleC.container}><Preloader/></div>
        : <div className={css.containerCenterDiv}>
            <div className={`${css.loginDiv}`}>
                <div className={styleC.content_card}>
                    <div className={"btn btn_full btn_black"}>Авторизація</div>
                    <LoginReduxForm onSubmit={onSubmit}/>
                    <div>
                        <NavLink to="/recovery">Відновити пароль?</NavLink>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <NavLink to="/register">Створити аккаунт?</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}