import React from 'react';
import css from './i.module.css'
import SimpleBtn from '../common/SimpleBtn/SimpleBtn';
import JinnGridTwoBlockContainer from '../common/JinnGridTwoBlockContainer/JinnGridTwoBlockContainer';
import ModalFormMe from '../common/ModalFormMe/ModalFormMe';
import Modal from "../../../../common/Modal/Modal";
import modalCss from "../../../../common/Modal/Modal.module.css";
import ReactHtmlParser from 'react-html-parser';


const I = ({title, subTitle}) => {
    let modal3 = false;

    const myServices = [
        {
            title: 'ОБО МНЕ',
            description: `
- Разрабатывал Чат бот сервис; Front-end: React.js; Back-end: PHP
- Разрабатывал Маркетинг Quiz сервис
- Разрабатывал приложение для Android и наушников AirPods
- Разрабатывал Бота(Парсер, массфоллов, лайкинг) для инстаграм`,
            text: `
- Разрабатывал блог на PHP
- Поднимал сервер Apache
- Поднимал proxy-сервер на Ubuntu с помощью Dante 
- Разрабатывал интернет магазин на PHP (PHP backend, API, JS на фронте - делал ajax загрузку страниц, JQuery, Bootstrap для верстки)
- Разрабатывал бота инстаграм для рассылки по диалогам, использовал библиотеку instagram-private-api
- Разрабатывал Чат с использованием библиотеки Socket.io
- Разрабатывал приложение для Android и наушников AirPods
- Разрабатывал Бота(Парсер, массфоллов, лайкинг) для инстаграм (Расширение для Google Chrome)
- Разрабатывал Чат бот сервис; Front-end: React.js; Back-end: PHP
  - Модуль авторизации
  - Модуль блог
  - Модуль создания Чат бота
  - Модуль чата
- Разрабатывал Маркетинг Quiz сервис`,
        },
        {
            title: 'Разработка Jinn_com',
            description: `
- Разрабатывал Чат бот сервис; 

Front-end: React.js, Redux;
Написал 
  - Модуль авторизации 
  - Модуль создания бота 
    - Использовал "xarrow" - для создания mindmap-a
    - Продумал структуру хранения настроек и сценариев бота для удобства хранения mysql и возможностью перехода на mongodb, API c PHP сервера на NodeJS на Express-е 
    - Сделал интеграцию бота в bitrix24 и Telegram
  - Модуль чата

Back-end: PHP - собственный MVC движок основную часть которого писал еще когда только изучал PHP - по структуре похож на LARAVEL
  - API авторизации работа с безопасностью пользователей
  - PDO интерфейс для работы mysql `,
            text: `
- Разрабатывал Чат бот сервис; 

Front-end: React.js, Redux;
Написал 
  - Модуль авторизации 
  - Модуль создания бота 
    - Использовал "xarrow" - для создания mindmap-a
    - Продумал структуру хранения настроек и сценариев бота для удобства хранения mysql и возможностью перехода на mongodb, API c PHP сервера на NodeJS на Express-е 
    - Сделал интеграцию бота в bitrix24 и Telegram
  - Модуль чата

Back-end: PHP - собственный MVC движок основную часть которого писал еще когда только изучал PHP - по структуре похож на LARAVEL
  - API авторизации работа с безопасностью пользователей
  - Использовал PDO интерфейс для работы с mysql`,
        },
        {
            title: 'Приложение для Android и AirPods',
            description: 'Разрабатывал приложение для Android и наушников AirPods',
            text: 'Разрабатывал приложение для Android и наушников AirPods',
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
            {myServices.map((s, k) => {
                let modal4 = false;

                return <div className={css.box} key={k}>
                    <h2>{s.title}</h2>
                    <div>{s.description.substring(0,55)} {s.description.length > 55 ? "..." : "" }</div>
                    <div className={css.about}>
                        <div>
                            <div onClick={() => modal4(true)}>Подробнее</div>
                            <ModalDetali callback={(view, setView) => {modal4 = setView}} text={s.text}/>
                            <div onClick={() => modal3(true)}><SimpleBtn>Связаться</SimpleBtn></div>
                            <ModalFormMe callback={(view, setView) => {modal3 = setView}}/>
                        </div>
                    </div>
                </div>
            })}
        </JinnGridTwoBlockContainer>
    </div>
}

export default I



const ModalDetali = ({callback, text}) => {
    return <Modal callback={callback}>
        <div className={modalCss.content} style={{whiteSpace: "pre-wrap"}}>
            {ReactHtmlParser(text)}
        </div>
    </Modal>
}