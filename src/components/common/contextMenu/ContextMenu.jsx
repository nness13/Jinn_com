import React from "react";
import ReactDOM from "react-dom";
import {compose} from "redux";
import css from "./ContextMenu.module.css";


const ContextMenu = props => {
    const {position, status, close} = props.data

    const createPosition = (item) => {
        let iW = parseInt(window.getComputedStyle(item).width), wW = window.innerWidth
        let iH = parseInt(window.getComputedStyle(item).height), wH = window.innerHeight
        let i = position

        if(i.x + iW > wW) {
            item.style.right = wW - i.x + 'px'
        } else item.style.left = i.x + 'px'
        if(i.y + iH > wH) {
            item.style.bottom = wH - i.y + 'px'
        } else item.style.top = i.y + 'px'
    }

    return ReactDOM.createPortal(status
        ? <section className={css.section} onClick={close}>
            <div ref={i => i && createPosition(i)} className={css.space}>
                {props.children}
            </div>
        </section>
        : ``
        , document.getElementById('root'))
}

export default compose()(ContextMenu)