import React, {useReducer, useCallback, useMemo, useState} from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";
import {
    counterReducer,
    incCounterAC,
    setErrorAC,
    setMaxCounterAC,
    setStartCounterAC
} from "./model/counter-reducer";

export const App = () => {
    const [initialState] = useState(() => ({
        minCounter: Number(localStorage.getItem('minCounter')) || 0,
        maxCounter: Number(localStorage.getItem('maxCounter')) || 5
    }));

    const [buttonsDisabled, setButtonsDisabling] = useState<boolean>(true);

    const [state, dispatchToInputValues] = useReducer(counterReducer, {
        counter: 0,
        maxValue: 5,
        error: false
    });

    const onIncHandler = () => {
            if (state.counter < initialState.maxCounter) {
                // debugger
                dispatchToInputValues(incCounterAC());
            }
        }

    const onResetHandler = () => {
            dispatchToInputValues(setStartCounterAC(initialState.minCounter));
        }

    const disablingDisplayButtons = (buttonsActive: boolean) => {
            setButtonsDisabling(buttonsActive);
        }

    const setErrorFlag = useCallback((isInputError: boolean) => {
        dispatchToInputValues(setErrorAC(isInputError));
    }, []);

    const setInputValues = useCallback((start: number, max: number) => {
        dispatchToInputValues(setStartCounterAC(start));
        dispatchToInputValues(setMaxCounterAC(max));
    }, []);

    const settingsDisplayProps = {
        minCounter: initialState.minCounter,
        maxCounter: initialState.maxCounter,
        errorFlag: state.error,
        setInputValues,
        setErrorFlag,
        disablingDisplayButtons,
        buttonsDisabled
    }

    const displayProps = {
        onIncHandler,
        onResetHandler,
        maxCounter: initialState.maxCounter,
        buttonsDisabled,
        errorFlag: state.error,
        counter: state.counter
    }

    return (
        <div className="App">
            <div className="container">
                <div className="settings_window">
                    <SettingsDisplay {...settingsDisplayProps} />
                </div>
                <div className="counter_window">
                    <Display {...displayProps} />
                </div>
            </div>
        </div>
    );
}


