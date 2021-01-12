import React, {useEffect, useRef, useState} from 'react';
import cssCL from './StoryView.module.css';
import mainCss from '../../../../styles/Main.module.css';
import UserBlock from './IntentBlock/IntentUserBlock/UserBlock';
import BotBlock from './IntentBlock/IntentBotBlock/BotBlock';
import ConnectArrow from '../../../common/ConnectArrow/ConnectArrow';
import {generateRandomString} from '../../../../util';
import AddUserBlock from './IntentBlock/common/AddUserBlock';
import {connect} from 'react-redux';
import {createScript, removeScript, setNameScriptAC} from '../botReducer';

const StoryView = ({bot, saveIntent, removeIntent, inspector, refObj}) => {
    let list = []
    let clickMove = false
    let screenMove = {
        onMouseDown: () => clickMove = true,
        onMouseUp: () => clickMove = false,
        onMouseLeave: () => clickMove = false,
        ref: el => el && el.addEventListener("selectstart", e => {
            e.preventDefault();
            return false;
        }),
        onMouseMove: e => {if(clickMove) e.currentTarget.scrollLeft = (e.currentTarget.scrollLeft - e.movementX)}
    }

    return <div className={cssCL.container} ref={refObj}>
        {bot?.template?.scripts?.map(s =>
            <React.Fragment key={s.id}>
                <ScriptTitle script={s}/>
                <div className={cssCL.createLine} {...screenMove}>
                    {bot?.template?.intents?.map(el => {
                        Array.prototype.push.apply(list, el?.script?.nextIntent);
                        if(el?.script?.id === s.id && !list.includes(el.id))
                            return <UserGroup key={el.id} bot={bot} intents={[el]} saveIntent={saveIntent} removeIntent={removeIntent} meta={{step: 0}} inspector={inspector}/>
                    })}
                    {!bot?.template?.intents?.find(a => a.script.id === s.id) &&
                    <div className={cssCL.wrapVariableBlock}>
                        <AddUserBlock id={generateRandomString()} parentIntent={{script: {id: s.id}}} method={"first"}/>
                    </div>}
                </div>
            </React.Fragment>)}
        <PlusCreateLine />
    </div>
}

export default StoryView





const UserGroup = ({bot, intents, saveIntent, removeIntent, meta, inspector}) => {
    let childIntents = [], intent = intents?.find(i => i.selected === true)

    return <React.Fragment key={intent?.id}>
        <div className={cssCL.wrapVariableBlock}>
            {intents?.map(i => <UserBlock key={i.id} intent={i} saveIntent={saveIntent} removeIntent={removeIntent} inspector={inspector}/>)}
            {meta?.step > 0 && <>
                <AddUserBlock id={generateRandomString()} parentIntent={meta.parentIntent} method={"pushNextVariant"}/>
                <AddUserBlock id={generateRandomString()} parentIntent={meta.parentIntent} method={"insertBetween"}/>
            </>}
        </div>
        {intent && <>
            <ConnectArrow start={intent.id} end={intent.response.id} active={true}/>
            <BotBlock intent={intent} saveIntent={saveIntent} inspector={inspector}/>
            {intent?.script?.nextIntent.length === 0 &&
            <div className={cssCL.wrapVariableBlock}>
                <AddUserBlock id={generateRandomString()} parentIntent={intent} method={"pushNextVariant"}/>
            </div>}
        </>}

        {/*{console.log(intent)}*/}
        {intent?.script?.nextIntent?.map(chId => {
            // console.log(chId)

            let childIntent = bot?.template?.intents?.find(e => e.id === chId)
            // console.log(childIntent)
            childIntents.push(childIntent)
            return <ConnectArrow key={chId} start={intent?.response?.id} end={childIntent?.id} active={childIntent?.selected}/>
        })}
        {childIntents.length > 0 && <UserGroup bot={bot} intents={childIntents} saveIntent={saveIntent}  removeIntent={removeIntent} meta={{step: 1, parentIntent: intent}} inspector={inspector}/>}
    </React.Fragment>
}


const PlusCreateLine = connect(null, {createScript})(({createScript}) =>
    <div className={cssCL.container}>
        <div className={cssCL.createLine}>
            <div className={mainCss.whiteBtn} onClick={() => createScript("Новий сценарий")}>
                <div>Добавить сценарий</div>
            </div>
        </div>
    </div>)


const ScriptTitle = connect(null, {setNameScriptAC, removeScript})(({script, setNameScriptAC, removeScript}) => {
    const [nameScriptEdit, setNameScriptEdit] = useState(false)
    const input = useRef(null)

    return <div className={cssCL.title}>
        <div>
            {nameScriptEdit
                ? <div className={cssCL.input}>
                    <input type="text" placeholder={script.name} ref={input}/>
                    <div onClick={() => removeScript(script.id)}>
                        <ion-icon name="trash-outline" style={{fontSize: 25}}/>
                    </div>
                    <div onClick={() => {
                        setNameScriptEdit(false)
                        setNameScriptAC({script, inputValue: input.current.value})
                    }}>
                        <ion-icon name="checkmark-outline" style={{fontSize: 25}}/>
                    </div>
                </div>
                : <div className={cssCL.input} onClick={() => setNameScriptEdit(true)}>
                    <input type="text" value={script.name} disabled/>
                    <ion-icon name="create-outline" style={{fontSize: 25}}/>
                </div>
            }
        </div>
    </div>
})