import React, {useEffect} from 'react';
import blockCss from '../IntentBlock.module.css';
import {reduxForm} from 'redux-form';
import join from 'classnames';
import mainCss from '../../../../../../styles/Main.module.css';
import AreaSwitch from '../../../common/AreaSwitch/AreaSwitch';
import InputTags from '../../../common/InputTags/InputTags';
import Button from '../../../../../common/Buttons/Button';
import modalCss from '../../../../../common/Modal/Modal.module.css';
import Modal from '../../../../../common/Modal/Modal';


const UserBlock = ({intent, saveIntent, removeIntent}) => {
    return <div className={blockCss.VariantBlock} id={intent.id}
                onMouseDown={e => {e.stopPropagation();}}
                ref={el => {el && el.addEventListener("selectstart", e => {e.stopPropagation()});}}
                onClick={() => (!intent.selected) && saveIntent(intent, {selected: true})}
                style={intent.selected ? {border: "1px solid var(--mainBlueLight)"} : {}}>
        {!intent.selected && <div className={blockCss.blurDiv} />}
        {intent.status === "edit" && intent.selected
            ? <EditForm form={intent.id}
                        intent={intent}
                        saveIntent={saveIntent} removeIntent={removeIntent}
                        initValues={{
                            openChat: intent.openChat.status,
                            anyText: intent.anyText.status,
                            anotherText: intent.anotherText.status,
                            regexSwitch: intent.regexText.status,
                            regexText: intent.regexText.rgx,
                        }}
                        onSubmit={d => {
                            saveIntent(intent, {...d, status: "default"})
                        }}/>
            : <div className={blockCss.block}>
                <img src="/assets/image/mobileGuy.png"/>
                <div className={blockCss.main}>
                    <div className={blockCss.mainTitle}>Если клиент</div>
                    {intent.openChat.status && <>
                        <div className={blockCss.mainTitle}>
                            <ion-icon name="checkmark-outline"/>
                            Вошел в чат
                        </div>
                    </>}
                    {intent.anotherText.status && <>
                        <div className={blockCss.mainTitle}>
                            <ion-icon name="checkmark-outline"/>
                            Непонятний текст
                        </div>
                    </>}
                    {intent.anyText.status && <>
                        <div className={blockCss.mainTitle}>
                            <ion-icon name="checkmark-outline"/>
                            Напишет любой текст
                        </div>
                    </>}
                    {intent.regexText.status && <>
                        <div className={blockCss.mainTitle}>
                            <ion-icon name="checkmark-outline"/>
                            Напишет слова:
                        </div>
                        <div className={blockCss.mainContent}>
                            {intent.regexText.rgx.join(' | ')}
                        </div>
                    </>}
                </div>
                <div className={blockCss.settingBtn} onClick={() => {saveIntent(intent, {status: "edit"})}}>
                    <ion-icon name="settings-outline"/>
                </div>
            </div>}
    </div>
}


export default UserBlock





const EditForm = reduxForm()(
    ({initialized, initialize, initValues,
         change, array,
         saveIntent, removeIntent,
         intent, handleSubmit}) => {
        useEffect(() => {
            if(!initialized) initialize(initValues)
        })
        let modal = false;

        return <form onSubmit={handleSubmit}>
            <div className={join(mainCss.column)} onClick={e => e.stopPropagation()}>
                <div className={join(mainCss.column)}>
                    <div className={join(blockCss.mainTitle, mainCss.row, mainCss.between)}>Если клиент
                        <div className={blockCss.btnHashTagIntent}>#{intent.response.id}</div>
                    </div>

                    <AreaSwitch title={"Присоединиться к чату"}
                                propsSwitch={{name: "openChat"}}
                                about={"Когда клиент присойденился к чату"}/>

                    <AreaSwitch title={'Напишет любой текст'}
                                propsSwitch={{name: 'anyText'}}
                                about={'Когда в сообщении клиента будет любой текст'}/>

                    <AreaSwitch title={'Напишет непонятний текст'}
                                propsSwitch={{name: 'anotherText'}}
                                about={'Когда в сообщении клиента будет текст которий не подошел ни под один из вариантов.\n(Должно быть последним вариантом!)'}/>

                    <InputTags title={"Напишет слова"}
                               propsSwitch={{
                                   name: "regexSwitch",
                                   change: change
                               }}
                               propsInput={{
                                   name: "regexText",
                                   formArrMethod: array
                               }}
                               about={"Когда в сообщении клиента будет определенное слово"}/>

                    <div className={join(mainCss.row, mainCss.evenly)}>
                        <Button>Сохранить</Button>

                        <div className={blockCss.settingBtn} onClick={() => saveIntent(intent, {status: "default"})}>Отменить</div>
                        <div className={blockCss.settingBtn} title={"Удалить?"} onClick={() => modal(true)}>
                            <ion-icon name="trash-outline"/>
                            <Modal title={"Виберите действие"} callback={(view, setView) => {modal = setView}}>
                                <div className={modalCss.content}>
                                    <div className={mainCss.whiteBtn} onClick={() => {
                                        removeIntent.removeIntent(intent)
                                        modal(false)
                                    }}>Удалить поточний елемент</div>
                                    <div className={mainCss.whiteBtn} onClick={() => {
                                        removeIntent.removeIntentAndChild(intent)
                                        modal(false)
                                    }}>Удалить целую ветку</div>
                                </div>
                                <div className={modalCss.bottomPanel}></div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    })