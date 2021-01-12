let initialState= {
    messages: [
//        {id:'0cfhh7hi', type: "info", text:'pushAlertAC', timeout: 10000}
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PUSH_MESSAGE:
            return {...state, messages: [...state.messages, {
                    id: action.data.id || generateRandomString(),
                    type: action.data.type || "info",
                    text: action.data.text,
                    timeout: action.data.timeout || 10000
                }]};

        case REMOVE_MESSAGE:
            return {...state, messages: state.messages.filter(el => el.id !== action.data)};

        default:
            return state;
    }
};

const PUSH_MESSAGE = 'PUSH_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const pushAlertAC = (message) => ({type: PUSH_MESSAGE, data: message});
export const removeAlertAC = (id) => ({type: REMOVE_MESSAGE, data: id});


export default reducer;

function generateRandomString(length = 8){
    return Math.random().toString(20).substr(2, length)
}