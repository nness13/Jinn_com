let initialState= {
    initialized: false,
    redirect: false,
    nightMode: false,
    isFetching: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true};

        case REDIRECT_SUCCESS:
            return {...state, redirect: action.data};

        case TOGGLE_IS_NIGHTMODE:
            return {...state, nightMode: action.data};

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.data};

        default:
            return state;
    }
};
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const REDIRECT_SUCCESS = 'REDIRECT_SUCCESS';
const TOGGLE_IS_NIGHTMODE = 'TOGGLE_IS_NIGHTMODE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const redirectAC = (data) => ({type: REDIRECT_SUCCESS, data: data});
export const setFetchingAC = (data) => ({type: TOGGLE_IS_FETCHING, data: data});
export const setNightModeAC = (data) => ({type: TOGGLE_IS_NIGHTMODE, data: data});

export const initializeApp = () => (dispatch) => {

};

export default appReducer;



export const getStatusNightMode = (state) => (state.app.nightMode)