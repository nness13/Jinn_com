import React from 'react';
import css from './i.module.css'
import {instance} from '../../../../../../api/api';
import {connect} from 'react-redux';
import {pushAlertAC} from '../../../../../common/Alert/alertReducer';
import modalCss from '../../../../../common/Modal/Modal.module.css';
import mainCss from '../../../../../../styles/Main.module.css';
import Modal from '../../../../../common/Modal/Modal';

const ModalFormMe = ({callback, pushAlertAC}) => {
    const onSubmit = e => {
        e.preventDefault()
        let form = {}
        Array.from(e.currentTarget.elements).map(i => {
            if(i.tagName === "INPUT") {
                form[i.name] = i.value
                i.value = ""
            }
        })

        sendOrder(form)
    }
    const sendOrder = (data) => {
        orderApi.sendOrder(data).then( res => pushAlertAC({text: res.message}) )
    }

    return <Modal callback={callback}>
        <form className={css.form} onSubmit={onSubmit}>
            <div className={modalCss.content}>
                {/*<div className={css.formTitle}>Оставьте свой контакт,<br/> чтобы мы перезвонили Вам и обсудили все<br/> детали вашего проекта</div>*/}
                <div>
                    <input type="text" name="name" className={css.input} placeholder={"Ваше имя"} pattern="([Aa-ZzА-Яа-яЁё\s]{1,30})" required/>
                    <input type="tel" name="phone" className={css.input} placeholder={"Ваш телефон"} pattern="[+0-9]{9,13}" required/>
                    <div>
                        Сообщение будет доставлено мне в телеграм*
                    </div>
                </div>
            </div>
            <div className={modalCss.bottomPanel}>
                <div style={{display: "flex", flexDirection: "column", marginRight: 20}}>
                    <a href="tel:+380968582865"><ion-icon name="call-sharp"/>Позвонить</a>
                    <a target={"__blank"} href="https://t.me/nnes13"><ion-icon name="paper-plane-sharp"/>Телеграм</a>
                </div>
                <button className={css.btnConsultation}>Оставить заявку</button>
            </div>
        </form>
    </Modal>
}




const orderApi = {
    sendOrder: (data) => instance.post(`order/portfolio`, data).then( response => response.data )
}
export default connect(null, {pushAlertAC})(ModalFormMe)