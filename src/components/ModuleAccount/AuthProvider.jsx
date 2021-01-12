import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {meTC} from './authReducer';
import Preloader from '../common/preloader/Preloader';

const AuthProvider = ({auth, meTC, children}) => {
    useEffect(() => {
        if(!auth.initialize && !auth.isAuth) meTC();
    })

    return auth.initialize
        ? children
        : <div className="App">
            <Preloader/>
        </div>
}


export default compose(
    connect(state => ({auth: state.auth}), {meTC})
)(AuthProvider)