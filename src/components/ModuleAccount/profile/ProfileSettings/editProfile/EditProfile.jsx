import React from 'react';
import cCss from '../../../../../styles/Container.module.css';
import EditProfileReduxForm from './EditProfileForm';
import {connect} from 'react-redux';
import {getUserData, updateTC} from '../../../authReducer';

const EditProfile = ({auth, updateTC}) => {
    return (
        <div className={`${cCss.big_h} ${cCss.big_w}`}>
            <div className={cCss.content_card}>
                <EditProfileReduxForm
                    onSubmit={updateTC}
                    auth={auth}
                    initialValues={{
                        name: auth.login,
                        email: auth.email
                    }}/>
            </div>
        </div>
    )
};

export default connect(state => ({
    auth: getUserData(state),
}), {updateTC})(EditProfile);