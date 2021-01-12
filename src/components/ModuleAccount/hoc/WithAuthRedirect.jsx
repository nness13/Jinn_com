import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthData} from '../authReducer';
import {pushAlertAC} from '../../common/Alert/alertReducer';


export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        UNSAFE_componentWillMount() {
            if (!this.props.isAuth) this.props.pushAlertAC({text: "Авторизийтесь, что б продолжить"})
        }

        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />;

            return <Component {...this.props}/>
        }
    }

    return connect(state => ({
        isAuth: getAuthData(state).isAuth,
    }), {pushAlertAC})(RedirectComponent);
};