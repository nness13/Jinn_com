import {setFetchingAC} from '../../../redux/reducers/fetchingReducer';
import {instance} from '../../../api/api';

let initialState= {
    chats: [],
    isLoad: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CHATS:
            state.isLoad = true;
            state.chats = action.data
            return {...state}
        case SAVE_CHAT:
//            objUpdate(state.chats.find(c => c.id === action.data.id), action.data)
            return {...state}
        case SAVE_GROUP:
            return {...state}
        case DELETE_CHAT:
            state.chats = state.chats.filter(c => c.id !== action.data.id)
            return {...state}
        default:
            return state;
    }
};

let SAVE_CHATS = "SAVE_CHATS"
let SAVE_CHAT = "SAVE_CHAT"
let SAVE_GROUP = "SAVE_GROUP"
let DELETE_CHAT = "DELETE_CHAT"

export const saveChatsAC = (data) => ({type: SAVE_CHATS, data: data})
export const saveChatAC = (data) => ({type: SAVE_CHAT, data: data})
export const saveChatGroupAC = (data) => ({type: SAVE_GROUP, data: data})
export const deleteChatAC = (data) => ({type: DELETE_CHAT, data: data})

export const getChats = () => (dispatch) => {
    dispatch(setFetchingAC('loadChats', false));
    chatAPI.getChats().then(response => {
        console.log(response)
        if(response.status === 200){
            dispatch(saveChatsAC(response.data.chats.map(chat => {
                chat.messages = JSON.parse("["+chat.messages+"]")
                chat.context = chat.context ? JSON.parse(chat.context) : {}
                return chat
            } )))
        }
        dispatch(setFetchingAC('loadChats', false));
    });
}
export const editChatGroup = (data) => (dispatch) => {
    chatAPI.editChatGroup(data).then(response => {
        if(response.status === 200){
            dispatch(saveChatGroupAC(data))
        }
    });
}
export const deleteChat = (data) => (dispatch) => {
    chatAPI.deleteChat({id: data.id}).then(response => {
        if(response.status === 200){
            dispatch(deleteChatAC(data))
        }
    });
}


export default reducer;


export const chatAPI = {
    getChats() {
        return instance.get('get/chats').then( response => {return response.data})
    },
    editChatGroup(data) {
        return instance.post('edit/chat', data).then( response => {return response.data})
    },
    deleteChat(data) {
        return instance.delete(`chat/${data.id}`, data).then( response => {return response.data})
    },
};