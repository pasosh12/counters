import React from 'react';
import './App.css';
import {Button} from './Button';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";

function App() {
    const minCounter=0;
    const maxCounter = 5;
    const [counter, setCounter] = React.useState<number>(0);
    const [startValue, setStartValue] = React.useState<number>(minCounter);
    const [maxValue, setMaxValue] = React.useState<number>(maxCounter);
    const [limitFlag, setLimitFlag] = React.useState<boolean>(false);
    const [errorFlag, setErrorFlag] = React.useState<boolean>(false);
    const isResetDisabled = counter === 0
    const isIncDisabled = counter === maxCounter;

    const onIncHandler = () => {
        if (counter < maxCounter) {
            setCounter(counter + 1);
        }
        if (counter === maxCounter-1) {
            setLimitFlag(true)
        }
    }
    const onResetHandler = () => {
        setCounter(0)
        setLimitFlag(false);
        // setMaxValue(Math.floor(Math.random() * (10-1)+1));
    }
    const disablingButtons=()=>{

    }
    const OutputDisplayProps = {onResetHandler,onIncHandler, isIncDisabled, isResetDisabled}
    const SettingsDisplayProps = {startValue,setStartValue,maxValue,setMaxValue, setCounter}
    return (
        <div className="App">
            <div className="container">

                <div className="settings_window">
                    <SettingsDisplay setErrorFlag={setErrorFlag} {...SettingsDisplayProps} />
                </div>
                    <div className="counter_window">
                        <Display limitFlag={limitFlag} errorFlag={errorFlag}
                                 counter={counter} maxValue={maxValue}
                                 disablingButtons={disablingButtons}
                                 {...OutputDisplayProps}/>
                    </div>
                </div>
            </div>
            );
            }

            export default App;
