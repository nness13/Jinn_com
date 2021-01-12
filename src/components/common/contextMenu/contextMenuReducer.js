const SET_STATUS = 'SET_STATUS';
const SET_POSITION = 'SET_POSITION';

let initialState= {
    status: false,
    position: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS:
            return {...state, status: action.data};

        case SET_POSITION:
            return {...state, position: action.data};

        default:
            return state;
    }
};

export const setStatusAC = (data) => ({type: SET_STATUS, data: data});
export const setPositionAC = (data) => ({type: SET_POSITION, data: data});

export const openTC = (data) => (dispatch) => {
    dispatch(setStatusAC(true))
    dispatch(setPositionAC({x: data.x, y: data.y}))

};
export const closeTC = () => (dispatch) => {
    dispatch(setStatusAC(false))
    dispatch(setPositionAC({}))
};

export default reducer;