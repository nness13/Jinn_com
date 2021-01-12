import React, {useEffect, useRef, useState} from 'react';
import {compose} from 'redux';
import css from './ChatsDashboard.module.css';
import blockCss from '../CreateBot/StoryView/IntentBlock/IntentBlock.module.css';
import {withAuthRedirect} from '../../ModuleAccount/hoc/WithAuthRedirect';
import {connect} from 'react-redux';
import {deleteChat, editChatGroup, getChats} from './dashboardReducer';
import modalCss from '../../common/Modal/Modal.module.css';
import mainCss from '../../../styles/Main.module.css';
import Modal from '../../common/Modal/Modal';

const ChatsDashboard = ({dashboard, getChats, editChatGroup, deleteChat}) => {
    useEffect(() => {
        if(!dashboard.isLoad) getChats()
    })
    let sort = {}
    const [editGroup, setEditGroup] = useState(false)
    const inputEdit = useRef()

    dashboard.chats && dashboard.chats.map(chat => {
        let group = chat.context.group || "Неопределено"
        let view = () => {
            let modalAddBot = false;
            let cd = chat.context.clientData
            let objCD = cd && Object.keys(cd)

            return <div className={blockCss.VariantBlock} onClick={() => modalAddBot(true)}>
                <div className={blockCss.block}>
                    <img src="/assets/image/mobileGuy.png"/>
                    <div className={blockCss.main}>
                        <div className={blockCss.mainTitle}>
                            Последнее сообщение клиента:
                        </div>
                        <div className={blockCss.mainContent}>
                            {cd && <div>{objCD[objCD.length - 1]} -> {cd[objCD[objCD.length - 1]]}</div>}
                        </div>
                    </div>
                </div>
                <Modal title={group} callback={(view, setView) => {modalAddBot = setView}}>
                    <div className={modalCss.content}>
                        <div className={"column"}>
                            <div className={"row"}>
                                <div className={mainCss.whiteBtn}>
                                    <div>Категория</div>
                                </div>
                                <div style={{marginLeft: 10, width: 300}} className={"row"}>
                                    {editGroup
                                        ? <form className={"row"}
                                                onSubmit={e => {
                                                    e.stopPropagation()
                                                    setEditGroup(false)
                                                    chat.context.group = inputEdit.current.value
                                                    editChatGroup(chat)
                                                }}>
                                            <input type="text" ref={inputEdit} className={mainCss.whiteBtn} defaultValue={group}/>
                                            <button><ion-icon name="checkmark-outline"/></button>
                                        </form>
                                        : <div className={"row"}>
                                            {group}
                                            <div onClick={() => setEditGroup(true)}><ion-icon name="create-outline"/></div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {chat.context.clientData && Object.keys(chat.context.clientData).map(k => <div className={"row"}>
                                <div className={mainCss.whiteBtn}>
                                    <div>{k}</div>
                                </div>
                                <div style={{marginLeft: 10, width: 350}}>{chat.context.clientData[k]}</div>
                            </div>)}
                        </div>
                    </div>
                    <div className={modalCss.bottomPanel}>
                        <div className={mainCss.whiteBtn} onClick={() => deleteChat(chat)}><ion-icon name="trash-outline"/>Удалить</div>
                        <div className={mainCss.whiteBtn} onClick={() => window.runChat({chatId: chat.id, autorun: true})}>Посмотреть историю чата</div>
                        <div className={mainCss.btn} onClick={() => modalAddBot(false)}>Закрить</div>
                    </div>
                </Modal>
            </div>
        }
        sort[group]
            ? sort[group].push(view())
            : sort[group] = [view()]
        return ""
    })

    return <div className={css.Container}>
        {Object.keys(sort).map(s => <div className={css.block}>
            <div className={css.title}>{s}</div>
            {sort[s].map(el => el)}
        </div>)}

    </div>
};



export default compose(
    connect(state => ({dashboard: state.dashboard}), {getChats, editChatGroup, deleteChat}),
    withAuthRedirect
)(ChatsDashboard);