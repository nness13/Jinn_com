import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './reducers/appReducer';
import contextMenuReducer from '../components/common/contextMenu/contextMenuReducer';
import fetchingReducer from './reducers/fetchingReducer';
import botReducer from '../components/ModuleJinnBot/CreateBot/botReducer';
import authReducer from '../components/ModuleAccount/authReducer';
import alertReducer from '../components/common/Alert/alertReducer';
import modalReducer from '../components/common/Modal/modalReducer';
import dashboardReducer from '../components/ModuleJinnBot/ChatsDashboard/dashboardReducer';

let reducers = combineReducers({
    app: appReducer,
    form: formReducer,

    auth: authReducer,
    bot: botReducer,
    dashboard: dashboardReducer,

    fetching: fetchingReducer,
    contextMenu: contextMenuReducer,
    alert: alertReducer,
    modal: modalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25
}) : compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;