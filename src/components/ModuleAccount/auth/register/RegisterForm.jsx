import {Field, reduxForm} from "redux-form";
import React from "react";
import FieldPassword from "../../../common/FieldPassword/FieldPassword";

const RegisterForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div><Field type="text" placeholder={"Імя"} name="name" component={"input"} autoComplete="off"/></div>
        <div><Field type="text" placeholder={"Email"} name="email" component={"input"} autoComplete="off"/></div>
        <div><Field name="password" component={FieldPassword}/></div>
        <button className={"btn btn_full btn_black"}>Зареєструватись</button>
    </form>
};


export default reduxForm({form: "register"})(RegisterForm);