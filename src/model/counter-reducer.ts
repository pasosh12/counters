
export type InputValuesState = {
    counter: number;
    startValue: number;
    maxValue: number;
    error: boolean;
}
export const incCounterAC = () => {
    return {type: 'INC_COUNTER'} as const;
}
export const setValuesAC = (payload:{startValue: number,maxCounter:number}) => {
    return {type: 'SET_VALUES', startValue:payload.startValue, maxCounter:payload.maxCounter } as const;
}
export const resetCounterAC = (startValue:number) => {
    return {type: 'RESET_COUNTER', payload: startValue} as const;
}
export const setErrorAC = (error: boolean) => {
    return {type: 'SET_ERROR', payload: error} as const;
}

export type InputValuesActionType =
    | ReturnType<typeof incCounterAC>
    | ReturnType<typeof setValuesAC>
    | ReturnType<typeof resetCounterAC>
    | ReturnType<typeof setErrorAC>

const initialState: InputValuesState = {
    counter: 0,
    startValue: 0,
    maxValue: 5,
    error: false
};

export const counterReducer = (state: InputValuesState = initialState, action: InputValuesActionType): InputValuesState => {
    switch (action.type) {
        case 'INC_COUNTER':
            return {...state, counter:  state.counter+1};
        case 'SET_VALUES':
            return {...state, counter:action.startValue, startValue:action.startValue, maxValue: action.maxCounter};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'RESET_COUNTER':
            return{...state, counter: action.payload};
        default:
            return state;
    }
};