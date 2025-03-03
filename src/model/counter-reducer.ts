// inputValuesReducer.ts
export type InputValuesState ={
    counter: number;
    maxValue: number;
    error: boolean ;
}
export const incCounterAC=()=>{
    return { type: 'INC_COUNTER'} as const;
}
export const resetCounterAC=()=>{
    return { type: 'RESET_COUNTER', payload: 0 } as const;
}
export const setErrorAC=(error:boolean)=>{
    return { type: 'SET_ERROR', payload: error } as const;
}

export type InputValuesActionType =
    | ReturnType<typeof incCounterAC>
    | ReturnType<typeof resetCounterAC>
    | ReturnType<typeof setErrorAC>
    // | { type: 'RESET_VALUES' };

const initialState: InputValuesState = {
    counter: 0,
    maxValue: 5,
    error: false
};

export const counterReducer = (state: InputValuesState = initialState, action: InputValuesActionType): InputValuesState => {
    switch (action.type) {
        case 'INC_COUNTER':
            return { ...state, counter: state.counter + 1 };
        case 'RESET_COUNTER':
            return { ...state, counter: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        // case 'RESET_VALUES':
        //     return initialState;
        default:
            return state;
    }
};