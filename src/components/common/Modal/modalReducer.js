let initialState= {
    view: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VIEW:
            state.view = action.data
            return {...state};
        default:
            return state;
    }
};

const CHANGE_VIEW = 'CHANGE_VIEW';

export const changeViewAC = (data) => ({type: CHANGE_VIEW, data: data});


export default reducer;