import {Field, reduxForm} from "redux-form";
import React from "react";
import FieldPassword from "../../../common/FieldPassword/FieldPassword";

const LoginForm = props => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field type="text" placeholder={"Імя користувача"} name="name" component={"input"}/></div>
        <div><Field name="password" component={FieldPassword}/></div>
        <button className={"btn btn_full btn_black"}>Увійти</button>
    </form>
};

export default reduxForm({form: 'login'})(LoginForm);