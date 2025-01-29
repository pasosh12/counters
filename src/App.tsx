import React from 'react';
import './App.css';
import {Button} from './Button';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";

function App() {
    const minCounter: number = Number(localStorage.getItem('minCounter')) || 0;
    const maxCounter: number = Number(localStorage.getItem('maxCounter')) || 5;
    const [counter, setCounter] = React.useState<number>(0);
    const [startValue, setStartValue] = React.useState<number>(minCounter);
    const [maxValue, setMaxValue] = React.useState<number>(maxCounter);
    const [limitFlag, setLimitFlag] = React.useState<boolean>(false);
    const [errorFlag, setErrorFlag] = React.useState<boolean>(false);
    const [isMessageActive, setMessageActive] = React.useState<boolean>(true);
    const [buttonsDisabled, setButtonsDisabling] = React.useState<boolean>(false);
    const isResetDisabled = counter === 0
    const isIncDisabled = counter === maxCounter;

    React.useEffect(() => {
        if (counter === maxCounter) setLimitFlag(true);
        else setLimitFlag(false);
    }, [counter])

    const onIncHandler = () => {
        if (counter < maxCounter) setCounter(counter + 1);
    }
    const onResetHandler = () => {
        setCounter(minCounter)
    }
    const disablingButtons = (isSet: boolean) => {
        if (localStorage.getItem('maxCounter') && localStorage.getItem('minCounter')) {
            setButtonsDisabling(isSet)
        }
    }
    const SettingsDisplayFlagsSettersProps = {setStartValue,setCounter,setMaxValue,setErrorFlag, disablingButtons}
    const OutputDisplayFlagsProps = {errorFlag, limitFlag, isIncDisabled, isResetDisabled}
    return (
        <div className="App">
            <div className="container">
                <div className="settings_window">
                    <SettingsDisplay startValue={startValue}
                                     maxValue={maxValue}
                                     errorFlag={errorFlag}
                                     // setMaxValue={setMaxValue}
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
