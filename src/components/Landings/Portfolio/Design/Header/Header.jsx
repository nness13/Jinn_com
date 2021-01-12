import React, {useEffect, useState} from 'react';
import css from './i.module.css'
import SimpleBtn from '../common/SimpleBtn/SimpleBtn'
import {to} from '../../../../../util';
import ModalFormMe from '../common/ModalFormMe/ModalFormMe';

const I = () => {
    const [isMobile, setMobile] = useState(false)
    useEffect(() => {
        const adaptiveHeight = () => {
            setMobile(window.innerWidth < 780)
        }
        adaptiveHeight()
        window.addEventListener('resize', adaptiveHeight);
        return () => window.removeEventListener('resize', adaptiveHeight);
    })
    let modal = false

    return isMobile
        ? <div/>
        : <div className={css.w}>
            <a className={css.t} onClick={() => to('Preview')}>IT-NNESS</a>
            <div className={css.m}>
                <div className={css.m_i} onClick={() => to('Services')}>Услуги</div>
                <div className={css.m_i} onClick={() => to('Example', 0)}>Мои работы</div>
                {/*<div className={css.m_i}>Результаты</div>*/}
                <div>
                    <SimpleBtn onClick={() => modal(true)}>КОНСУЛЬТАЦИЯ</SimpleBtn>
                    <ModalFormMe callback={(view, setView) => {modal = setView}}/>
                </div>
            </div>
        </div>
}

export default I