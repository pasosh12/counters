import React from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";
import {useState} from "react";

function App() {
    const minCounter: number = Number(localStorage.getItem('minCounter'));
    const maxCounter: number = Number(localStorage.getItem('maxCounter')) || 5;

    const [startValue, setStartValue] = useState<number>(minCounter);
    const [maxValue, setMaxValue] = useState<number>(maxCounter);
    const [limitFlag, setLimitFlag] = useState<boolean>(false);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [isMessageActive, setMessageActive] = useState<boolean>(false);
    const [buttonsDisabled, setButtonsDisabling] = useState<boolean>(true);
    const [counter, setCounter] = useState<number>(0);

    const onIncHandler = () => {
        if (counter < maxCounter) setCounter(counter + 1);
    }
    const onResetHandler = () => {
        setCounter(minCounter)
    }

    const disablingDisplayButtons = (setIsSet: boolean) => {
        if (localStorage.getItem('maxCounter') && localStorage.getItem('minCounter')) {
            setButtonsDisabling(setIsSet)
        }
    }
    const SettingsDisplayFlagsSettersProps = {
        setStartValue,
        setCounter,
        setMaxValue,
        setErrorFlag,
        disablingDisplayButtons
    }
    const OutputDisplayFlagsProps = {
        errorFlag, limitFlag, maxCounter, setLimitFlag
    }
    return (
        <div className="App">
            <div className="container">
                <div className="settings_window">
                    <SettingsDisplay startValue={startValue}
                                     maxValue={maxValue}
                                     errorFlag={errorFlag}
                                     setMessageActive={setMessageActive}
                                     {...SettingsDisplayFlagsSettersProps} />
                </div>
                <div className="counter_window">
                    <Display onIncHandler={onIncHandler} onResetHandler={onResetHandler}
                             counter={counter}
                             isMessageActive={isMessageActive}
                             buttonsDisabled={buttonsDisabled}
                             {...OutputDisplayFlagsProps}/>
                </div>
            </div>
        </div>
    );
}

export default App
