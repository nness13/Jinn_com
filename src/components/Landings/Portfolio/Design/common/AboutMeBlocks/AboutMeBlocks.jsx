import React from 'react';
import css from './i.module.css'

const AboutMeBlocks = () => {
    return <div className={css.w}>
        <div className={css.block}>
            <img src={"https://i.ibb.co/fYSxpMQ/IMG-20201104-113638-282.jpg"} alt="Name"/>
            <a className={css.t} href={"https://instagram.com/andriy__n"} target={"__blank"}>{"Андрий\nНестер"}</a>
        </div>
        <div className={css.block}>
            <ion-icon name="checkmark-circle-sharp"/>
            <div>создатель <a href="https://j-inn.com">j-inn.com</a></div>
        </div>
    </div>
}

export default AboutMeBlocks