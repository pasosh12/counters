import React, {useReducer} from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";
import {useState} from "react";
import {counterReducer, incCounterAC, resetCounterAC, setErrorAC} from "./model/counter-reducer";

function App() {
    const minCounter: number = Number(localStorage.getItem('minCounter')) || 0
    const maxCounter: number = Number(localStorage.getItem('maxCounter')) || 5

    const [buttonsDisabled, setButtonsDisabling] = useState<boolean>(true);

    const [state,dispatchToInputValues]=useReducer(counterReducer,
        {counter:minCounter, maxValue:maxCounter,error:false}
    )
    // const dispatch =      dispatchToInputValues
    // const [errorFlag, dispatchToInputValues]=useReducer(counterReducer,{})
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);


    const onIncHandler = () => {
        if (state.counter < maxCounter){
            // dispatchToInputValues(incCounterAC())
            setCounter(counter + 1);
        }
    }
    const onResetHandler = () => {
        // dispatchToInputValues(resetCounterAC())
        setCounter(minCounter)
    }

    const disablingDisplayButtons = (buttonsActive: boolean) => {
         setButtonsDisabling(buttonsActive)
    }

    // const setErrorFlag=(isInputError:boolean)=>{
    //     dispatch(setErrorAC(isInputError))
    // }
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
