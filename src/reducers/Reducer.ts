import {Action, State, ActionType} from "../types/stateType";

export const initialState: State = {
    initial: false
}

export const appReducer = (state: State, action: Action):State => {
    switch (action.type) {
        case ActionType.ADD: {
            return {...state}
        }
        case ActionType.CHANGE: {
            return {...state}
        }
        case ActionType.REMOVE: {
            return {...state}
        }
        case ActionType.TOGGLE: {
            return {...state}
        }
        default: throw new Error('Unexpected action');
    }
};