import {generateRandomString} from '../../../util';
import {instance} from '../../../api/api';
import {setFetchingAC} from '../../../redux/reducers/fetchingReducer';
import {pushAlertAC} from '../../common/Alert/alertReducer';
import produce from "immer"

let initialState= {
    selectBot: "",
    bots: [],
    loadBot: false
};

const reducer = produce((draft = initialState, action) => {
    const {type, payload} = action
    const draftData = {}
    switch (type) {
        case ADD_BOT:
            draft.bots = [
                ...draft.bots,
                ...payload.map(b => ({
                    ...TemplateBot({name: b.name}),
                    id: b.id,
                    template: JSON.parse(b.template),
                    status: b.status
                }))
            ]
            return draft
        case SAVE_BOTS:
            draft.bots = payload.map(b => ({
                ...TemplateBot({name: b.name}),
                id: b.id,
                template: JSON.parse(b.template),
                status: b.status
            }))
            return draft
        case SAVE_BOT_STATUS:
            draft.bots.find(b => b.id === draft.selectBot).status = payload
            return draft
        case SELECT_BOT:
            draft.selectBot = payload
            return draft
        case GET_BOTS_STATUS:
            draft.loadBot = payload
            return draft
        case CREATE_CONTEXT:
            draftData.bot = draft.bots.find(b => b.id === draft.selectBot)
            draftData.bot.template.contexts.push({...TemplateContext(), ...payload})
            return draft
        case CREATE_INTENT:
            // debugger
            draftData.bot = draft.bots.find(b => b.id === draft.selectBot)
            draftData.bot.template.intents.push(payload.intent)
            return draft
        case SAVE_INTENT:
            // debugger
            draftData.intents = draft.bots.find(b => b.id === draft.selectBot).template.intents
            draftData.intent = draftData.intents.find(i => i.id === payload.intent.id)

            if(typeof payload.data.openChat !== 'undefined') draftData.intent.openChat.status = payload.data.openChat;
            if(typeof payload.data.anyText !== 'undefined') draftData.intent.anyText.status = payload.data.anyText;
            if(typeof payload.data.anotherText !== 'undefined') draftData.intent.anotherText.status = payload.data.anotherText;
            if(typeof payload.data.status !== 'undefined') draftData.intent.status = payload.data.status;
            if(typeof payload.data.moveToSwitch !== 'undefined') draftData.intent.moveTo.status = payload.data.moveToSwitch;
            if(typeof payload.data.afterReturnSwitch !== 'undefined') draftData.intent.moveTo.afterReturn = payload.data.afterReturnSwitch;

            if(typeof payload.data.textMessageSwitch !== 'undefined') draftData.intent.textMessage.status = payload.data.textMessageSwitch;
            if(typeof payload.data.textMessage !== 'undefined') draftData.intent.textMessage.text = payload.data.textMessage;

            if(typeof payload.data.saveResponseSwitch !== 'undefined') draftData.intent.saveResponse.status = payload.data.saveResponseSwitch;
            if(typeof payload.data.nameVariable !== 'undefined') draftData.intent.saveResponse.nameVariable = payload.data.nameVariable;

            if(typeof payload.data.clientGroupSwitch !== 'undefined') draftData.intent.clientGroup.status = payload.data.clientGroupSwitch;
            if(typeof payload.data.clientGroup !== 'undefined') draftData.intent.clientGroup.value = payload.data.clientGroup;

            if(typeof payload.data.sendMailNotificationSwitch !== 'undefined') draftData.intent.sendMailNotification.status = payload.data.sendMailNotificationSwitch;
            if(typeof payload.data.sendMailNotificationValue !== 'undefined') draftData.intent.sendMailNotification.value = payload.data.sendMailNotificationValue;

            if(typeof payload.data.selected !== 'undefined' && typeof draftData.intent.selected !== 'undefined') {
                if(payload.data.selected) {
                    let intents = draft.bots.find(b => b.id = draft.selectBot).template.intents
                    intents.map(i => {
                        if(i.script.nextIntent.includes(draftData.intent.id))
                            i.script.nextIntent.map(c => intents.find(q => q.id === c ).selected = false)
                    })
                    draftData.intent.selected = true;
                }else draftData.intent.selected = false;
            }
            if(typeof payload.data.regexText !== 'undefined') {
                draftData.intent.regexText.status = payload.data.regexSwitch;
                draftData.intent.regexText.rgx = payload.data.regexText;
            }

            return draft
        case SAVE_INTENT_INSPECTOR:
            draftData.intnt = draft.bots.find(b => b.id === draft.selectBot).template.intents.find(i => i.id === payload.intent)
            draftData.intnt.response.moveTo.moveToIntent = payload.data
            return draft
        case REMOVE_INTENT_AND_CHILDS:
            draftData.intents = draft.bots.find(b => b.id === draft.selectBot).template.intents
            draftData.intent = draftData.intents.find(i => i.id === payload.intent.id)
            // Удаляю интент и всех детей
            removeIntentUtil(draftData.intents, draftData.intent)
            // Удаляю связь с родителем и Делаю другой интент активним
            draftData.intents.map(i => {
                if(i.script.nextIntent.includes(draftData.intent.id)) {
                    // Удаляю связь с родителем
                    i.script.nextIntent = i.script.nextIntent.filter(i => i !== draftData.intent.id)
                    // Нахожу если есть и Делаю другой интент активним
                    draftData.defaultSelect = draftData.intents.find(el => el.id === i.script.nextIntent[0])
                    if(draftData.defaultSelect) draftData.defaultSelect.selected = true
                }
            })  // Встановлюю активний Intent вместо удаленного
            return draft
        case REMOVE_INTENT:
            draftData.intents = draft.bots.find(b => b.id === draft.selectBot).template.intents
            // Соединяем детей
            draftData.parentIntent = draftData.intents.find(el => el.script.nextIntent.includes(payload.intent.id))
            // Если есть родитель, удаляем у родителя сведения о нем
            if(draftData.parentIntent){
                draftData.parentIntent.script.nextIntent = draftData.parentIntent.script.nextIntent.filter(i => i !== payload.intent.id)
                draftData.parentIntent.script.nextIntent.push(payload.intent.script.nextIntent)
            }else{
                if(payload.intent.script.nextIntent.length > 0){
                    // Если есть дети, находим обьект первого ребенка делаем активним и указываем что ето первый интент сценария
                    draftData.intents.find(el => {
                        if(el.id === payload.intent.script.nextIntent[0]){
                            el.script.first = true
                            el.selected = true
                            return true
                        }
                    })
                }
            }
            // Удаляем интент
            draftData.intents.splice(0, draftData.intents, ...draftData.intents.filter(i => i.id !== payload.intent.id))

            return draft
        case CREATE_SCRIPT:
            draftData.scripts = draft.bots.find(b => b.id === draft.selectBot).template.scripts
            draftData.scripts.push(TemplateScript(payload.name))
            return draft
        case REMOVE_SCRIPT:
            // Видаляю все интенти надлежашщие сценарию
            draftData.allIntents = draft.bots.find(b => b.id === draft.selectBot).template.intents
            draftData.allIntents.splice(0, draftData.allIntents.length, ...draftData.allIntents.filter(el => el.script.id !== payload.scriptID) )

            // Удаляю сценарий
            draftData.allScripts = draft.bots.find(b => b.id === draft.selectBot).template.scripts
            draftData.allScripts.splice(0, draftData.allScripts.length, ...draftData.allScripts.filter(s => s.id !== payload.scriptID) )
            return draft
        case PUSH_NEXT_INTENT:
            // debugger
            draftData.intents = draft.bots.find(b => b.id === draft.selectBot).template.intents
            draftData.intent = draftData.intents.find(i => i.id === payload.intent.id)

            // Перебираю детей Интента убирая виделения со всех
            draftData.intent.script.nextIntent.map(el => {
                draftData.intents.find(i => i.id === el).selected = false
            })
            // Делаю созданний интент ребенком родительського интента
            draftData.intent.script.nextIntent.push(payload.newChildIntent.id)
            return draft
        case INSERT_BETWEEN:
            draftData.intents = draft.bots.find(b => b.id === draft.selectBot).template.intents
            draftData.intent = draftData.intents.find(i => i.id === payload.data.intent.id)

            payload.newChildIntent.script.nextIntent = draftData.intent.script.nextIntent
            draftData.intent.script.nextIntent = [payload.newChildIntent.id]
            return draft
        case SET_NAME_SCRIPT:
            payload.script.name = payload.inputValue
            return draft
        default:
            return draft;
    }
});

const ADD_BOT = 'ADD_BOT';
const SAVE_BOTS = 'SAVE_BOTS';
const SAVE_BOT_STATUS = 'SAVE_BOT_STATUS';
const SELECT_BOT = 'SELECT_BOT';
const GET_BOTS_STATUS = 'GET_BOTS_STATUS';

const CREATE_INTENT = 'CREATE_INTENT';
const SAVE_INTENT = 'SAVE_INTENT';
const SAVE_INTENT_INSPECTOR = 'SAVE_INTENT_INSPECTOR';
const REMOVE_INTENT_AND_CHILDS = 'REMOVE_INTENT_AND_CHILDS';
const REMOVE_INTENT = 'REMOVE_INTENT';

const CREATE_CONTEXT = 'CREATE_CONTEXT';
const CREATE_SCRIPT = 'CREATE_SCRIPT';
const REMOVE_SCRIPT = 'REMOVE_SCRIPT';

const PUSH_NEXT_INTENT = 'PUSH_NEXT_INTENT';
const INSERT_BETWEEN = 'INSERT_BETWEEN';

const SET_NAME_SCRIPT = 'SET_NAME_SCRIPT';


export const addBotAC = (payload) => ({type: ADD_BOT, payload: payload});
export const saveBotsAC = (payload) => ({type: SAVE_BOTS, payload: payload});
export const saveBotStatusAC = (payload) => ({type: SAVE_BOT_STATUS, payload: payload});
export const selectBotAC = (payload) => ({type: SELECT_BOT, payload: payload});
export const getBotsStatusAC = (payload) => ({type: GET_BOTS_STATUS, payload: payload});

export const createIntentAC = (intent) => ({type: CREATE_INTENT, payload: {intent: intent}});
export const saveIntentAC = (intent, data) => ({type: SAVE_INTENT, payload: {intent: intent, data: data}});
export const saveIntentInspectorAC = (intent, data) => ({type: SAVE_INTENT_INSPECTOR, payload: {intent: intent, data: data}});
export const removeIntentAndChildAC = (intent) => ({type: REMOVE_INTENT_AND_CHILDS, payload: {intent: intent}});
export const removeIntentAC = (intent) => ({type: REMOVE_INTENT, payload: {intent: intent}});

export const createContextAC = (data) => ({type: CREATE_CONTEXT, payload: {data: data}});
export const createScriptAC = (name) => ({type: CREATE_SCRIPT, payload: {name: name}});
export const removeScriptAC = (id) => ({type: REMOVE_SCRIPT, payload: {scriptID: id}});

export const pushNextIntentAC = (payload) => ({type: PUSH_NEXT_INTENT, payload: payload});
export const insertBetweenAC = (payload) => ({type: INSERT_BETWEEN, payload: payload});

export const setNameScriptAC = (script, inputValue) => ({type: SET_NAME_SCRIPT, payload: {script, inputValue}});


export const createBot = (name) => (dispatch) => {
    dispatch(setFetchingAC('loadBot', true))
    const defaultScript = TemplateScript("Сценарий без названия")
    const defaultIntent = TemplateIntent()
    const defaultIntent2 = TemplateIntent()
    const defaultIntent3 = TemplateIntent()
    botAPI.createBot(name, {
        ...TemplateBotTemplate(),
        scripts: [defaultScript],
        intents: [{
            ...defaultIntent,
            script: {
                ...defaultIntent.script,
                id: defaultScript.id,
                first: true,
                nextIntent: [defaultIntent2.id, defaultIntent3.id]
            }
        }, {
            ...defaultIntent2,
            script: {
                ...defaultIntent2.script,
                id: defaultScript.id
            },
            selected: false
        }, {
            ...defaultIntent3,
            script: {
                ...defaultIntent3.script,
                id: defaultScript.id
            }
        }]
    },  {
        miniView: true,
    }).then(response => {
        if(response.status === 200) {
            dispatch(selectBotAC(response.data.bots[0].id))
            dispatch(getBotsStatusAC(true))
            dispatch(addBotAC(response.data.bots))
            dispatch(setFetchingAC('loadBot', false))
        }
    })
}
export const getBots = () => (dispatch) => {
    dispatch(setFetchingAC('loadBot', true))
    botAPI.getBots().then(response => {
        console.log(response)
        if(response.status === 200) {
            dispatch(selectBotAC(response.data.bots[0].id))
            dispatch(getBotsStatusAC(true))
            dispatch(saveBotsAC(response.data.bots))
            dispatch(setFetchingAC('loadBot', false))
        }
    })
}

export const saveBotStatus = (data) => (dispatch, getState) => {
    const state = getState()

    dispatch(setFetchingAC('toggleStatusBot', true))
    botAPI.updateBot(state.bot.selectBot, {status: data}).then(response => {
        dispatch(saveBotStatusAC(response.data.status))
        dispatch(setFetchingAC('toggleStatusBot', false))
    })
}

export const createContext = (name) => (dispatch, getState) => {
    dispatch(createContextAC({name: name}))

    dispatchUpdateBotUtil(dispatch, getState)
}

export const createScript = (name) => (dispatch, getState) => {
    dispatch(createScriptAC(name))
    dispatchUpdateBotUtil(dispatch, getState)
}
export const removeScript = (id) => (dispatch, getState) => {
    // debugger
    dispatch(removeScriptAC(id))
    dispatchUpdateBotUtil(dispatch, getState)
}

export const createIntent = (data) => (dispatch, getState) => {
    createIntentUtil({scriptID: data.intent.script.id, first: data.method === "first"}, dispatch, getState)
}



export const pushNextIntent = (data) => (dispatch, getState) => {
    const newChildIntent = createIntentUtil({scriptID: data.intent.script.id, first: data.method === "first"}, dispatch, getState)
    dispatch(pushNextIntentAC({newChildIntent, intent: data.intent}))
}
export const insertBetween = (data) => (dispatch, getState) => {
    const newChildIntent = createIntentUtil({scriptID: data.intent.script.id, first: data.method === "first"}, dispatch, getState)
    dispatch(insertBetweenAC({newChildIntent, intent: data.intent}))
}

export const createIntentUtil = (data, dispatch, getState) => {
    let intent = TemplateIntent()
    intent = {
        ...intent,
        script: {
            ...intent.script,
            id: data.scriptID || null,
            first: data.first || false
        }
    }
    dispatch(createIntentAC(intent))
    dispatchUpdateBotUtil(dispatch, getState)
    return intent
}
export function dispatchUpdateBotUtil(dispatch, getState, callback = () => {}) {
    const state = getState()
    dispatch(setFetchingAC('createContext', true))
    botAPI.updateBot(state.bot.selectBot, {template: state.bot.bots.find(b => b.id === state.bot.selectBot).template}).then(response => {
        if(response.status === 200) {
            callback(response)
            dispatch(setFetchingAC('createContext', false))
        }
    })
}

export const saveIntent = (intent, data) => (dispatch, getState) => {
    dispatch(saveIntentAC(intent, data))
    dispatchUpdateBotUtil(dispatch, getState)
}
export const saveIntentInspector = (intent, data) => (dispatch, getState) => {
    dispatch(saveIntentInspectorAC(intent, data))
    dispatchUpdateBotUtil(dispatch, getState)
}

export const removeIntentAndChild = (intent) => (dispatch, getState) => {
    dispatch(removeIntentAndChildAC(intent))
    dispatchUpdateBotUtil(dispatch, getState)
}
export const removeIntent = (intent) => (dispatch, getState) => {
    dispatch(removeIntentAC(intent))
    dispatchUpdateBotUtil(dispatch, getState)
}

export function removeIntentUtil(intents, intent) {
    // Видаляю Intent
    intent.script.nextIntent.map(i => removeIntentUtil(intents, intents.find(el => el.id === i) ))
    // Видаляю Intent
    intents.splice(intents.indexOf(intent), 1)
}


export default reducer;

export const botAPI = {
    createBot(name, template, options) {
        return instance.post(`bot/create`, {name: name, template: JSON.stringify(template), options: JSON.stringify(options)}).then( response => {return response.data})
    },
    updateBot(botId, template) {
        return instance.post(`bot/update`, {id: botId, ...template}).then( response => {return response.data})
    },
    getBots() {
        return instance.get(`get/bots`).then( response => {return response.data})
    },
};

const TemplateBot = ({name}) => ({
    id: 0,
    name: name || "",
    template: TemplateBotTemplate(),
    status: "default"
})

const TemplateBotTemplate = () => ({
    contexts: [],
    scripts: [],
    intents: [],
})

const TemplateScript = (name) => ({
    id: generateRandomString(),
    name: name || ""
})

const TemplateContext = () => ({
    id: generateRandomString(),
    name: "",
    data: {},
})

const TemplateIntent = () => ({
    id: generateRandomString(),
    script: {
        id: null,
        first: false,
        prevIntent: [],
        nextIntent: []
    },
    context: {},
    role: "user",
    status: "default",
    selected: true,
    openChat: {
        status: false
    },
    anyText: {
        status: false
    },
    anotherText: {
        status: false
    },
    regexText: {
        status: false,
        rgx: []
    },
    response: {
        id: generateRandomString(),
        role: "bot",
        status: "default",
        textMessage: {
            status: false,
            text: ""
        },
        moveTo: {
            status: false,
            moveToIntent: "",
            afterReturn: false
        },
        saveResponse: {
            status: false,
            nameVariable: ""
        },
        clientGroup: {
            status: false,
            value: ""
        },
        sendMailNotification: {
            status: false,
            value: ""
        },
    },
});


