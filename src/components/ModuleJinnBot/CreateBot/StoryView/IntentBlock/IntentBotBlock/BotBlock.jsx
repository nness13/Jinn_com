import React, {useEffect, useState} from 'react';
import blockCss from '../IntentBlock.module.css'
import cssCL from '../../StoryView.module.css';
import {Field, reduxForm} from 'redux-form';
import join from 'classnames';
import mainCss from '../../../../../../styles/Main.module.css';
import InputArea from '../../../common/InputArea/InputArea';
import Button from '../../../../../common/Buttons/Button';
import css from '../../../common/InputArea/InputArea.module.css';
import Switcher from '../../../../../common/Switcher/Switcher';
import About from '../../../../../common/AboutHolder/AboutHolder';
import {setFetchingAC} from '../../../../../../redux/reducers/fetchingReducer';
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';


const BotBlock = ({intent, saveIntent, inspector}) => {
    return <div className={cssCL.wrapVariableBlock}>
        <div className={blockCss.VariantBlock} id={intent.response.id} onMouseDown={e => {e.stopPropagation();}}
             ref={el => {el && el.addEventListener("selectstart", e => {e.stopPropagation()});}}
             style={{border: "1px solid var(--mainBlueLight)"}}>
            {(inspector.inspectorIntent && inspector.inspectorIntent !== intent.response.id) && <div className={blockCss.inspectorDiv}>
                <Button onClick={() => {
                    inspector.setFetchingAC('inspectorIntent', false)
                    inspector.saveIntentInspector(inspector.inspectorIntent, intent.id)
                }}>Вибрать</Button>
            </div>}
            {intent.response.status === "edit"
                ? <EditForm form={intent.response.id}
                            intent={intent}
                            saveIntent={saveIntent}
                            initValues={{
                                moveToSwitch: intent.response.moveTo.status,
                                afterReturnSwitch: intent.response.moveTo.afterReturn,

                                textMessageSwitch: intent.response.textMessage.status,
                                textMessage: intent.response.textMessage.text,

                                saveResponseSwitch: intent.response.saveResponse.status,
                                nameVariable: intent.response.saveResponse.nameVariable,

                                clientGroupSwitch: intent.response.clientGroup.status,
                                clientGroup: intent.response.clientGroup.value,

                                sendMailNotificationSwitch: intent.response.sendMailNotification.status,
                                sendMailNotificationValue: intent.response.sendMailNotification.value || inspector.auth.email,
                            }}
                            onSubmit={d => {
                                saveIntent(intent.response, {...d, status: "default"})
                            }}/>
                : <div className={blockCss.block}>
                    <img src="/assets/main/Jinn.svg"/>
                    <div className={blockCss.main}>
                        <div className={blockCss.mainTitle}>Тогда Jinn</div>
                        {intent.response.moveTo.status && <>
                            <div className={blockCss.mainTitle}>
                                <ion-icon name="checkmark-outline"/>
                                <div>Переместит клиента на действие:
                                    <div className={blockCss.btnHashTagIntent}>#{intent.response.moveTo.moveToIntent}</div>
                                    <div>{intent.response.moveTo.afterReturn && "И вернет обратно по окончании того сценария" }</div>
                                </div>
                            </div>
                        </>}
                        {intent.response.clientGroup.status && <>
                            <div className={blockCss.mainTitle}>
                                <ion-icon name="checkmark-outline"/>
                                <div>Переместит клиента в групу:
                                    <div className={blockCss.btnHashTagIntent}>#{intent.response.clientGroup.value}</div>
                                </div>
                            </div>
                        </>}
                        {intent.response.sendMailNotification.status && <>
                            <div className={blockCss.mainTitle}>
                                <ion-icon name="checkmark-outline"/>
                                <div>Отправит уведомление на почту: {intent.response.sendMailNotification.value}</div>
                            </div>
                        </>}
                        {intent.response.saveResponse.status && <>
                            <div className={blockCss.mainTitle}>
                                <ion-icon name="checkmark-outline"/>
                                <div>Сохранит сообщение клиента как: {intent.response.saveResponse.nameVariable}</div>
                            </div>
                        </>}
                        {intent.response.textMessage.status && <>
                            <div className={blockCss.mainTitle}>
                                <ion-icon name="checkmark-outline"/>
                                Ответит сообщением
                            </div>
                            <div className={blockCss.mainContent}>
                                {ReactHtmlParser(intent.response.textMessage.text)}
                            </div>
                        </>}
                    </div>
                    <div className={blockCss.settingBtn} onClick={() => {saveIntent(intent.response, {status: "edit"})}}>
                        <ion-icon name="settings-outline"/>
                    </div>
                </div>}
        </div>
    </div>
}


export default BotBlock





const EditForm = reduxForm()(
    ({intent, handleSubmit, initialized, initialize, initValues, saveIntent, change, array}) => {
        useEffect(() => {
            if(!initialized) initialize(initValues)
        })

        return <form onSubmit={handleSubmit}>
            <div className={join(mainCss.column)} onClick={e => e.stopPropagation()}>
                <div className={join(mainCss.column)}>
                    <div className={join(blockCss.mainTitle, mainCss.row, mainCss.between)}>Тогда Jinn
                        <div className={blockCss.btnHashTagIntent}>#{intent.response.id}</div>
                    </div>

                    <MoveTo title={'Переместит клиента'}
                            intent={intent}
                            propsSwitch={{
                                name: 'moveToSwitch',
                                change: change
                            }}
                            propsAfterReturnSwitch={{
                                name: 'afterReturnSwitch',
                                change: change
                            }}
                            propsInspector={{
                                name: 'moveToIntent',
                                change: change
                            }}
                            about={'Переместит клиента на указаний шаг'}/>

                    <InputArea title={"Ответит сообщением"}
                               propsSwitch={{
                                   name: "textMessageSwitch",
                                   change: change
                               }}
                               propsInput={{
                                   name: "textMessage",
                                   formArrMethod: array
                               }}
                               about={"Когда в сообщении клиента будет определенное слово"}/>

                    <InputArea title={"Сохранит сообщение клиента"}
                               propsSwitch={{
                                   name: "saveResponseSwitch",
                                   change: change
                               }}
                               propsInput={{
                                   name: "nameVariable",
//                                   formArrMethod: array,
                                   placeholder: "Название сохраненного сообщения",
                                   style: {height: "30px"}
                               }}
                               about={"Сохранит сообщение в карту клиента"}/>

                    <InputArea title={"Изменит групу клиента"}
                               propsSwitch={{
                                   name: "clientGroupSwitch",
                                   change: change
                               }}
                               propsInput={{
                                   name: "clientGroup",
//                                   formArrMethod: array,
                                   placeholder: "Название групы клиентов, например: 'Заказы' ",
                                   style: {height: "50px"}
                               }}
                               about={"Добавить клиента в оприделенную групу, что б Вы удобно отслеживали заказы и т.п"}/>

                    <InputArea title={"Отправит уведомление"}
                               propsSwitch={{
                                   name: "sendMailNotificationSwitch",
                                   change: change
                               }}
                               propsInput={{
                                   name: "sendMailNotificationValue",
//                                   formArrMethod: array,
                                   placeholder: "Адресс електроной почти (По стандарту отправит на привязаную к аккаунту)",
                                   style: {height: "50px"}
                               }}
                               about={"По стандарту отправит уведомление на почту привязаную к аккаунту"}/>

                    <div className={join(mainCss.row, mainCss.evenly)}>
                        <Button>Сохранить</Button>
                        <div className={blockCss.settingBtn} onClick={() => saveIntent(intent.response, {status: "default"})}>Отменить</div>
                    </div>
                </div>
            </div>
        </form>
    })


const MoveTo = connect(null, {setFetchingAC})( ({title, intent, about, propsSwitch, propsInspector, propsAfterReturnSwitch, setFetchingAC}) => {
    const [edit, setEdit] = useState(false);

    return <div>
        <div className={join(css.title, edit && css.active)}>
            <div className={join(mainCss.row)}>
                <Field {...propsSwitch} component={props => {
                    setEdit(props.input.value);
                    return <Switcher input={{...props.input}}/>
                }}/>
                <div className={css.titleText} onClick={() => propsSwitch.change(propsSwitch.name, !edit)}>
                    {title}
                    <ion-icon name="chevron-down-outline" style={{fontSize: 14, marginLeft: 10}}/>
                </div>
            </div>
            <About>{about}</About>
        </div>
        {edit && <div className={css.area}>
            <div className={join(css.form, css.center)}>
                <div className={"column"} style={{width: "100%"}}>
                    <div className={css.center}>
                        {intent.response.moveTo.moveToIntent
                            ? <div className={mainCss.whiteBtn}>
                                <div>Вибрано действие: <div className={blockCss.btnHashTagIntent}>#{intent.response.moveTo.moveToIntent}</div></div>
                            </div>
                            : ""
                        }
                        <div className={mainCss.whiteBtn} onClick={() => setFetchingAC('inspectorIntent', intent.id)}>
                            <ion-icon name="create-outline"/>
                            <div>Вибрать действие</div>
                        </div>
                    </div>
                    <div className={join("row", css.afterReturn)}>
                        <Field {...propsAfterReturnSwitch} component={Switcher}/>
                        <div>Вернет клиента обратно</div>
                        <About>По окончанию действий сценария на которий перевели вернет и продолжить виполнять етот</About>
                    </div>
                </div>
            </div>
        </div>}
    </div>
})


const SelectAreaSwitch = connect(null, {setFetchingAC})( ({title, intent, about, propsSwitch, propsSelect, setFetchingAC}) => {
    const [edit, setEdit] = useState(false);

    return <div>
        <div className={join(css.title, edit && css.active)}>
            <div className={join(mainCss.row)}>
                <Field {...propsSwitch} component={props => {
                    setEdit(props.input.value);
                    return <Switcher input={{...props.input}}/>
                }}/>
                <div className={css.titleText} onClick={() => propsSwitch.change(propsSwitch.name, !edit)}>
                    {title}
                    <ion-icon name="chevron-down-outline" style={{fontSize: 14, marginLeft: 10}}/>
                </div>
            </div>
            <About>{about}</About>
        </div>
        {edit && <div className={css.area}>
            <div className={join(css.form, css.center)}>

            </div>
        </div>}
    </div>
})