import React from 'react';
import {connect} from 'react-redux';
import mainCss from '../../../../../../styles/Main.module.css';
import ConnectArrow from '../../../../../common/ConnectArrow/ConnectArrow';
import {pushNextIntent, insertBetween, createIntent} from '../../../botReducer';

const AddUserBlock = ({id, parentIntent, method, pushNextIntent, insertBetween, createIntent}) => {
    const click = () => {
        if(method === "first") createIntent({method, intent: parentIntent})
        if(method === "pushNextVariant") pushNextIntent({method, intent: parentIntent})
        if(method === "insertBetween") insertBetween({method, intent: parentIntent})
    }

    return <div style={{marginBottom: 5}}>
        {method !== "first" && <ConnectArrow start={parentIntent.response.id} end={id} active={false}/>}
        <div id={id} className={mainCss.whiteBtn}
             onClick={click} style={{margin: 0, width: 350}}>
            <div>
                {method === "pushNextVariant" && "Добавить вариант" ||
                method === "first" && "Добавить вариант" ||
                method === "insertBetween" && "Вставить вариант"}
            </div>
        </div>
    </div>}

export default connect(
    state => ({intents: state.bot.bots.find(b => b.id === state.bot.selectBot).template.intents}),
    {pushNextIntent, insertBetween, createIntent}
    )(AddUserBlock)