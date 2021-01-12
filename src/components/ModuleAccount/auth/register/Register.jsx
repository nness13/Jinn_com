import React from "react";
import {NavLink} from "react-router-dom";
import RegisterReduxForm from "./RegisterForm";
import Preloader from "../../../common/preloader/Preloader";
import css from "./Register.module.css";
import styleC from '../../../../styles/Container.module.css';


import {connect} from "react-redux";
import {getAuthData, registerTC} from '../../authReducer';
import {Redirect} from "react-router-dom";

const RegisterContainer = (props) => {
    const {isAuth, status, registerTC, isFetching} = props

    if(isAuth)
        return <Redirect to={"/profile"}/>
    if(status === "confirm")
        return <Redirect to={"/confirm"}/>
    else
        return <Register onSubmit={registerTC} isFetching={isFetching}/>
}

export default connect(state => ({
    isAuth: getAuthData(state).isAuth,
    status: getAuthData(state).status,
    isFetching: false
}), {registerTC})(RegisterContainer);


const Register = (props) => {
    const {onSubmit, isFetching} = props

    return isFetching
        ? <div className={styleC.container}><Preloader/></div>
        : <div className={css.containerCenterDiv}>
            <div className={`${css.loginDiv}`}>
                <div className={"btn btn_full btn_black"}>Реєстрація</div>
                <RegisterReduxForm onSubmit={onSubmit}/>
                <NavLink to="/login">Є аккаунт? Увійти</NavLink>
            </div>
        </div>
};