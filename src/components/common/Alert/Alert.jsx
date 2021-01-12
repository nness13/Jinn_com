import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'redux';
import css from './alert.module.css';
import {connect} from 'react-redux';
import {removeAlertAC} from './alertReducer';
//import {CountdownCircleTimer} from 'react-countdown-circle-timer';

const Alert = ({messages, removeAlertAC}) => {
    return ReactDOM.createPortal(messages.length !== 0
        ? <section className={css.section}>
            {messages.map(message =>
                <Message key={message.id} message={message} remove={removeAlertAC}/> )}
        </section>
        : ``
        , document.getElementById('root'))
}


const Message = ({message, remove}) => {
    return <div className={css.message}>
        <div className={css.body}>
            <div className={css.text}>
                {message.type === 'success' &&
                <ion-icon src="/assets/image/icon/success.svg"/>
                || message.type === 'error' &&
                <ion-icon src="/assets/image/icon/error.svg"/>
                || message.type === 'info' &&
                <ion-icon name="information-circle" style={{color: "var(--mainBlueLight)"}}/>
                }
                <div style={{marginLeft: 10}}>
                    {message.text}
                </div>
            </div>
            <div onClick={() => remove(message.id)}>
                <ion-icon name="close"/>
                {/*<CountdownCircleTimer*/}
                {/*    size={35}*/}
                {/*    strokeWidth={3}*/}
                {/*    isPlaying*/}
                {/*    onComplete={() => {*/}
                {/*        remove(message.id)*/}
                {/*        return [];*/}
                {/*    }}*/}
                {/*    duration={10}*/}
                {/*    colors={[*/}
                {/*        ['#5AF400', 0.50],*/}
                {/*        ['#F7B801', 0.20],*/}
                {/*        ['#F40011', 0.30],*/}
                {/*    ]}>*/}
                {/*    {({ remainingTime }) => remainingTime}*/}
                {/*</CountdownCircleTimer>*/}
            </div>
        </div>
    </div>
}

export default compose(
    connect(state => ({
        messages: state.alert.messages,
    }), {removeAlertAC})
)(Alert)