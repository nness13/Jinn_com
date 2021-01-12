import React, {createRef, useEffect} from 'react';
import {compose} from 'redux';
import css from './CreateBot.module.css';
import {connect} from 'react-redux';
import StoryView from './StoryView/StoryView';
import DataPanel from './DataPanel/DataPanel';
import {withAuthRedirect} from '../../ModuleAccount/hoc/WithAuthRedirect';
import {createBot, createContext, getBots, removeIntent, removeIntentAndChild, saveBotStatus, saveIntent, saveIntentInspector, selectBotAC} from './botReducer';
import ToolsLine from './StoryView/ToolsLine/ToolsLine';
import ContextLine from './StoryView/ContextLine/ContextLine';
import {setFetchingAC} from '../../../redux/reducers/fetchingReducer';
import {pushAlertAC} from '../../common/Alert/alertReducer';

const CreateBot = ({bot, createBot, getBots, selectBotAC, saveBotStatus, createContext, saveIntent, removeIntent, removeIntentAndChild, inspectorIntent, setFetchingAC, saveIntentInspector, auth, pushAlertAC}) => {
    useEffect(() => {
        if(!bot.loadBot) getBots()
    })

    const ref = createRef()
    let sizeLine = (e) => {
        ref.current.style.transform = `scale(${1 - e.currentTarget.value/100}, ${1 - e.currentTarget.value/100})`
        ref.current.style.transformOrigin = `top left`
        ref.current.style.width = `${ window.innerWidth/(1 - e.currentTarget.value/100) }px`
    }

    return <div className={css.Container}>
        <DataPanel bots={bot.bots} selectBot={bot.selectBot} saveBotStatus={saveBotStatus}
                   createBot={createBot} selectBotAC={selectBotAC} pushAlertAC={pushAlertAC}/>
        {bot.bots.length > 0 && <React.Fragment>
            <ToolsLine createContext={createContext}/>
            <ContextLine contexts={bot.bots.find(b => b.id === bot.selectBot)?.template.contexts}/>
            <div><input type={"range"} min={"0"} max={"100"} onInput={sizeLine} defaultValue={0}/></div>
            <StoryView bot={bot.bots.find(b => b.id === bot.selectBot)} saveIntent={saveIntent}
                       removeIntent={{removeIntent, removeIntentAndChild}} refObj={ref}
                       inspector={{inspectorIntent, setFetchingAC, saveIntentInspector, auth}}/>
        </React.Fragment>}
    </div>
};



export default compose(
    connect(state => ({
        auth: state.auth.userData,
        bot: state.bot,
        inspectorIntent: state.fetching?.inspectorIntent
    }), {createBot, getBots, selectBotAC, saveBotStatus, createContext, pushAlertAC,
        saveIntent, removeIntent, removeIntentAndChild, setFetchingAC, saveIntentInspector }),
    withAuthRedirect
)(CreateBot);