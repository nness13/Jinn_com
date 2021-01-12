const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState= {
    dialog: false,
    sendMessage: false,
    writingMessage: false,
    openChat: false,
};

const fetchingReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {...state, [action.name]: action.data};
        default:
            return state;
    }
};

export const setFetchingAC = (name, data) => ({type: TOGGLE_IS_FETCHING, name, data});


export default fetchingReducer;