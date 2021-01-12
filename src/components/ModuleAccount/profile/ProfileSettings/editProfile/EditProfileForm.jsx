import {Field, reduxForm} from "redux-form";
import React from "react";
import css from '../Profile.module.css'
import FieldPassword from "../../../../common/FieldPassword/FieldPassword";

const EditProfileForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={`${css.line} ${css.top}`}>
            <div className={`${css.title} btn_full btn_text`}>Аккаунт</div>
            {props.dirty && <div>Зберегти?<button><ion-icon name="checkbox"/></button></div>}
        </div>
        <div className={`${css.line}`}>
            <div className={css.inputTitle}>Логін</div>
            <div className={css.divInput}><Field type="text" placeholder={"Імя користувача"} name="name" component={"input"}/></div>
        </div>
        <div className={`${css.line}`}>
            <div className={css.inputTitle}>Email</div>
            <div className={css.divInput}><Field type="email" placeholder={"Email"} name="email" component={"input"}/></div>
        </div>
        <div className={`${css.line}`}>
            <div className={css.inputTitle}>Пароль</div>
            <div className={css.divInput}><Field name="password" placeholder={"**********"} component={FieldPassword}/></div>
        </div><br/>
        <div className={`${css.line}`}>
            <div className={css.inputTitle}>Баланс</div>
            <div className={css.divInput}>{props.auth.balance}</div>
        </div>
    </form>
};

const EditProfileReduxForm = reduxForm({
    form: 'EditProfile',
    enableReinitialize: true
})(EditProfileForm);

export default EditProfileReduxForm;