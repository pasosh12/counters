import React, {useReducer, useState} from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";
import {
    counterReducer,
    incCounterAC, resetCounterAC,
    setErrorAC,
    setValuesAC,
} from "./model/counter-reducer";

export const App = () => {

    const [buttonsDisabled, setButtonsDisabling] = useState<boolean>(true);

    const [state, dispatchToInputValues] = useReducer(counterReducer, {
        counter: Number(localStorage.getItem('minCounter')) || 0,
        startValue: Number(localStorage.getItem('minCounter')) || 0,
        maxValue: Number(localStorage.getItem('maxCounter')) || 5,
        error: false
    });

    const onIncHandler = () => {
        if (state.counter < state.maxValue) {
            dispatchToInputValues(incCounterAC());
        }
    }

    const onResetHandler = () => {
        dispatchToInputValues(resetCounterAC(state.startValue));
    }

    const disablingDisplayButtons = (buttonsActive: boolean) => {
        setButtonsDisabling(buttonsActive);
    }

    const setErrorFlag = (isInputError: boolean) => {
        dispatchToInputValues(setErrorAC(isInputError));
    };

    const setInputValues = (start: number, max: number) => {
        dispatchToInputValues(setValuesAC({startValue: start, maxCounter: max}));

    };

    const settingsDisplayProps = {
        minCounter: state.counter,
        maxCounter: state.maxValue,
        errorFlag: state.error,
        setInputValues,
        setErrorFlag,
        disablingDisplayButtons,
        buttonsDisabled
    }

    const displayProps = {
        onIncHandler,
        onResetHandler,
        maxCounter: state.maxValue,
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


