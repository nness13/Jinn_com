import React from 'react';
import css from './i.module.css'
import SimpleBtn from '../common/SimpleBtn/SimpleBtn';
import JinnGridTwoBlockContainer from '../common/JinnGridTwoBlockContainer/JinnGridTwoBlockContainer';
import ModalFormMe from '../common/ModalFormMe/ModalFormMe';
import {staticLinks} from '../../data';
import {to} from '../../../../../util';

const I = ({title, subTitle}) => {
    let modal3 = false;

    const myServices = [
        {
            title: 'Создание Сайтов',
            description: 'Сайт (Или уникальное програмное решение) для вашего бизнеса',
            about: <div>
                <div onClick={() => to('Example', 0)}>Подробнее</div>
                <div onClick={() => modal3(true)}><SimpleBtn>Написать</SimpleBtn></div>
                <ModalFormMe callback={(view, setView) => {modal3 = setView}}/>
            </div>
        },
        {
            title: 'Таргетинговая реклама Facebook и Instagram.',
            description: 'Получите индивидуальный расчёт стоимости клиента',
            about: <div onClick={() => modal3(true)}>
                <SimpleBtn>Получить</SimpleBtn>
                <ModalFormMe callback={(view, setView) => {modal3 = setView}}/>
            </div>
        },
        {
            title: 'Рассылки и охваты',
            description: ' - Instagram direct\n - Email\n - Viber\n - Telegram',
            about: <div>
                <div onClick={() => modal3(true)}><SimpleBtn>Написать</SimpleBtn></div>
                <ModalFormMe callback={(view, setView) => {modal3 = setView}}/>
            </div>
        },
    ]
    const b = {
        margin: "25px 20px 30px 20px",
        background: "none",
        border: "solid 4px #8F5DF2"
    }

    return <div className={css.w} id={'Services'}>
        <div className={css.t_preset}>
            <SimpleBtn style={b}>{title}</SimpleBtn>
            <div className={css.line}/>
            <div style={{color: "white"}}>{subTitle}</div>
        </div>
        <JinnGridTwoBlockContainer columns={"1fr 1fr 1fr"} gap={50}>
            {myServices.map((s, k) => <div className={css.box} key={k}>
                <h2>{s.title}</h2>
                <div>{s.description}</div>
                <div className={css.about}>{s.about}</div>
            </div>)}
        </JinnGridTwoBlockContainer>
    </div>
}

export default I