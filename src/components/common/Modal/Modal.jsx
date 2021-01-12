import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'redux';
import css from './Modal.module.css';
import {connect} from 'react-redux';
import {getStatusNightMode} from '../../../redux/reducers/appReducer';
import join from 'classnames'

const Modal = ({nightMode, children, callback, title}) => {
    const [view, setView] = useState(false)
    callback(view, setView)

    return ReactDOM.createPortal(view
        ? <section className={join(css.section, nightMode ? css.nightMode : css.whiteMode)} onClick={() => setView(false)}>
            <div className={css.modal} onClick={e => e.stopPropagation()} >
                <div className={css.topPanel}>
                    <div className={css.title}>{title}</div>
                    <div onClick={() => setView(false)}>
                        <ion-icon name="close" style={{fontSize: 25}}/>
                    </div>
                </div>
                {children}
            </div>
        </section>
        : ``
        , document.getElementById('root'))
}


export default compose(
    connect(state => ({
        nightMode: getStatusNightMode(state)
    }), {})
)(Modal)