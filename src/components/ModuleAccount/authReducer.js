import {instance} from '../../api/api';
import {pushAlertAC} from '../common/Alert/alertReducer';


let initialState = {
    userData: {
        id: null,
        login: null,
        email: null,
        balance: null,
        status: null,
    },

    initialize: false,
    isAuth: false,
    recoveryStep: 0
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE:
            return {...state, initialize: action.data};
        case SET_USER_DATA:
            return {...state, userData: {...action.data}, isAuth: action.isAuth};
        case SET_RECOVERY_STEP:
            return {...state, recoveryStep: action.data};
        default:
            return state;
    }
};

const INITIALIZE = 'INITIALIZE';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_RECOVERY_STEP = 'SET_RECOVERY_STEP';

export const initializeAC = (data) => ({type: INITIALIZE, data});
export const setUserDataAC = ({id, login, email, balance, status, isAuth}) => ({
    type: SET_USER_DATA,
    data: {id, login, email, balance, status},
    isAuth
});
export const setRecoveryStepAC = (data) => ({type: SET_RECOVERY_STEP, data});


export const meTC = () => (dispatch) => {
    return authAPI.me().then(response => {
        console.log(response)
        if (response.status === 200) {
            dispatch(setUserDataAC({...response.data, isAuth: true}));
        }
        dispatch(initializeAC(true));
    })
};
export const updateTC = (formData) => (dispatch) => {
    // dispatch(setFetchingAC(true));
    return authAPI.update(formData).then(response => {
        if (response.status === 200) {
            dispatch(setUserDataAC({...response.data, isAuth: true}));
        }
        // dispatch(setFetchingAC(false));
        dispatch(pushAlertAC({text: response?.message}))
    })
};
export const registerTC = (formData) => (dispatch) => {
    authAPI.register(formData).then(response => {
        if (response.status === 200) {
            dispatch(setUserDataAC({...initialState, status: "confirm"}));
        }
        dispatch(pushAlertAC({text: response?.message}))
    })
};
export const loginTC = ({name, password}) => (dispatch) => {
    authAPI.login(name, password).then(response => {
        console.log(response)
        if (response.status === 200) {
            dispatch(setUserDataAC({...response.data, isAuth: true}));
        }
        dispatch(pushAlertAC({text: response?.message}))
    })
};
export const confirmTC = (formData) => (dispatch) => {
    authAPI.confirm(formData).then(response => {
        if (response.status === 200) {
            dispatch(setUserDataAC({...response.data, isAuth: true}));
        }
        dispatch(pushAlertAC({text: response?.message}))
    })
};
export const confirmQueryCodeTC = () => (dispatch) => {
    authAPI.confirmQeuryCode().then(response => {
        dispatch(pushAlertAC({text: response?.message}))
    })
};

export const recoveryTC = (formData) => (dispatch) => {
    authAPI.recovery(formData).then(response => {
        if (response.status === 200) {
            console.log(response)
            switch (response.data.statusRecovery) {
                case 1:
                    console.log(1)
                    dispatch(setRecoveryStepAC(response.data.statusRecovery))
                    break;
                case 2:
                    console.log(2)
                    dispatch(setRecoveryStepAC(response.data.statusRecovery))
                    break;
                case 3:
                    console.log(3)
                    dispatch(setUserDataAC({...response.data, isAuth: true}))
                    dispatch(setRecoveryStepAC(response.data.statusRecovery))
                    break;
                default:
                    break;
            }
        }
        dispatch(pushAlertAC({text: response?.message}))
    })
};
export const recoveryQueryCodeTC = () => (dispatch) => {
    authAPI.recoveryQeuryCode().then(response => {
        dispatch(pushAlertAC({text: response?.message}))
    })
};
export const logoutTC = () => (dispatch) => {
    console.log('logout')
    authAPI.logout().then(response => {
        if (response.status === 200) {
            dispatch(setUserDataAC(initialState));
        }
        dispatch(pushAlertAC({text: response?.message}))
    })
};

export default authReducer;


export const authAPI = {
    me() {
        return instance.get("auth/me").then( response => {return response.data});
    },
    update({ name, email, password}) {
        return instance.post("auth/me", { action: "account", name, email, password}).then( response => {return response.data});
    },
    login(name, password, rememberMe = false, captcha = null) {
        return instance.post("auth/login", { name, password }).then( response => {return response.data});
    },
    register({ name, password, email }) {
        return instance.post(`auth/register`, { name, password, email }).then( response => {return response.data});
    },

    confirm(data) {
        return instance.post(`auth/confirm`, data).then( response => {return response.data});
    },
    confirmQeuryCode() {
        return instance.get(`auth/confirm`).then( response => {return response.data});
    },
    recovery(data) {
        return instance.post(`auth/recovery`, data).then( response => {return response.data});
    },
    recoveryQeuryCode() {
        return instance.get(`auth/recovery`).then( response => {return response.data});
    },

    logout() {
        return instance.delete(`auth/login`).then( response => {return response.data});
    }
};


export const getAuthData = state => (state.auth);
export const getUserData = state => (state.auth.userData);