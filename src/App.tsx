import React, {useReducer} from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";
import {useState} from "react";

function App() {
    const minCounter: number = Number(localStorage.getItem('minCounter')) || 0
    const maxCounter: number = Number(localStorage.getItem('maxCounter')) || 5

    const [buttonsDisabled, setButtonsDisabling] = useState<boolean>(true);

    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);


    const onIncHandler = () => {
        if (minCounter < maxCounter){
            setCounter(counter + 1);
        }
    }
    const onResetHandler = () => {
        setCounter(minCounter)
    }

    const disablingDisplayButtons = (buttonsActive: boolean) => {
         setButtonsDisabling(buttonsActive)
    }
    const SettingsDisplaySettersProps = {

        setCounter,
        setErrorFlag,
        disablingDisplayButtons,
        buttonsDisabled
    }


    return (
        <div className="App">
            <div className="container">
                <div className="settings_window">
                    <SettingsDisplay
                        // callBack={setErrorFlag}
                        minCounter={minCounter}
                                     maxCounter={maxCounter}
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
