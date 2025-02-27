import React from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";
import {useState} from "react";

function App() {
    const minCounter: number = Number(localStorage.getItem('minCounter')) || 0
    const maxCounter: number = Number(localStorage.getItem('maxCounter')) || 5

    const [startValue, setStartValue] = useState<number>(minCounter);
    const [maxValue, setMaxValue] = useState<number>(maxCounter);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [buttonsDisabled, setButtonsDisabling] = useState<boolean>(true);
    const [counter, setCounter] = useState<number>(0);

    const onIncHandler = () => {
        if (counter < maxCounter) setCounter(counter + 1);
    }
    const onResetHandler = () => {
        setCounter(minCounter)
    }

    const disablingDisplayButtons = (buttonsActive: boolean) => {
        if (startValue && maxValue) {
            setButtonsDisabling(buttonsActive)
        }
    }
    const SettingsDisplaySettersProps = {
        setStartValue,
        setCounter,
        setMaxValue,
        setErrorFlag,
        disablingDisplayButtons
    }

    return (
        <div className="App">
            <div className="container">
                <div className="settings_window">
                    <SettingsDisplay startValue={startValue}
                                     maxValue={maxValue}
                                     errorFlag={errorFlag}
                                     {...SettingsDisplaySettersProps} />
                </div>
                <div className="counter_window">
                    <Display onIncHandler={onIncHandler}
                             onResetHandler={onResetHandler}
                             counter={counter}
                             maxCounter={maxCounter}
                             errorFlag={errorFlag}
                             buttonsDisabled={buttonsDisabled}
                             />
                </div>
            </div>
        </div>
    );
}

export default App
