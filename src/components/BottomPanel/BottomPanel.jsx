import React, {useState} from 'react';
import css from './BottomPanel.module.css';
import {NavLink} from 'react-router-dom';
import ContextMenu from '../common/contextMenu/ContextMenu';
import CMcss from '../common/contextMenu/ContextMenu.module.css';
import {openTC} from '../common/contextMenu/contextMenuReducer';
import {pushAlertAC} from '../common/Alert/alertReducer';
import {getAuthData, logoutTC} from '../ModuleAccount/authReducer';
import join from 'classnames'
import {getStatusNightMode} from '../../redux/reducers/appReducer';
import {connect} from "react-redux";
import {compose} from "redux";

const BottomPanel = ({auth, logoutTC, nightMode}) => {
    let init = {
        status: false,
        position: null,
        close: null
    }
    const [CM1, setCM1] = useState(init)
    const [CM2, setCM2] = useState(init)


    return <div className={join(css.BottomPanel, nightMode ? css.nightMode : css.whiteMode)}>
    <div className={css.leftDiv}>

    <div className={css.item} onClick={e => setCM1({
        status: true,
        position: {x: 7, y: window.innerHeight - 50},
        close: () => setCM1(init)
    })}>
    <ion-icon style={{fontSize: 16}} src="/assets/main/list.svg"/>
    <div className={css.itemText} >Меню</div>
        </div>
        <ContextMenu data={CM1}>
            <NavLink to={"/"} className={CMcss.item}>Главная</NavLink>
            <NavLink to={"/create"} className={CMcss.item}>Создать бота</NavLink>
            {auth.isAuth && <NavLink to={"/chats/dashboard"} className={CMcss.item}>Клиенты</NavLink>}
            <NavLink to={"/airpods"} className={CMcss.item}>Jinn AirPods</NavLink>
            <NavLink to={"/nness"} className={CMcss.item}>Резюме</NavLink>
            <NavLink to={"/andriy"} className={CMcss.item}>Обо мне</NavLink>
    </ContextMenu>

    </div>

    <div className={css.lampDiv} onClick={() => window.runChat({botId: 1, autorun: true, miniView: false})}>
        <img src="/assets/main/magic-lamp.svg" alt={"Ooooops"}/>
    </div>


    <div className={css.rightDiv} >
        {auth.isAuth
                ? <div className={css.item}
                       onClick={e => setCM2({
                            status: true,
                            position: {x: window.innerWidth - 7, y: window.innerHeight - 50},
                            close: () => setCM2(init)
                        })}>
                        <ion-icon name="settings-sharp"/>
                    </div>
    : <NavLink className={css.item} to={"/login"}>
        <ion-icon name="log-in" style={{fontSize: 23}} />
    </NavLink>
    }
    </div>
        <ContextMenu data={CM2}>
            <NavLink to={"/profile"} className={CMcss.item}>Профиль</NavLink>
            <NavLink to={"/profile"} className={CMcss.item}>Налаштування</NavLink>
            <div className={CMcss.line}/>
            <div onClick={() => logoutTC()} className={CMcss.item}>Вийти</div>
        </ContextMenu>

    </div>
};

    export default connect(state => ({
            auth: getAuthData(state),
            nightMode: getStatusNightMode(state)
        }),
        {openTC, pushAlertAC, logoutTC})(BottomPanel);