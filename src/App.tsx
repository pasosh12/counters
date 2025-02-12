import React from 'react';
import './App.css';
import {Display} from "./Display";
import {SettingsDisplay} from "./SettingsDisplay";

function App() {
    const minCounter: number = Number(localStorage.getItem('minCounter'));
    const maxCounter: number = Number(localStorage.getItem('maxCounter')) || 5;

    const [startValue, setStartValue] = React.useState<number>(minCounter);
    const [maxValue, setMaxValue] = React.useState<number>(maxCounter);
    const [limitFlag, setLimitFlag] = React.useState<boolean>(false);
    const [errorFlag, setErrorFlag] = React.useState<boolean>(false);
    const [isMessageActive, setMessageActive] = React.useState<boolean>(false);
    const [buttonsDisabled, setButtonsDisabling] = React.useState<boolean>(true);
    // const [isIncDisabled, setIncDisabled] = (counter === maxCounter);
    // const [isResetDisabled,setResetDisabled] = (counter === 0)
    const [counter, setCounter] = React.useState<number>(0);
    const onIncHandler = () => {
        if (counter < maxCounter) setCounter(counter + 1);
    }
    const onResetHandler = () => {
        setCounter(minCounter)
    }
    // React.useEffect(() => {
    //     if (counter === maxCounter) {setLimitFlag(true);
    //     // setIncDisabled(true);
    //         }
    //
    //     else setLimitFlag(false);
    // }, [counter, maxCounter])


    const disablingButtons = (isSet: boolean) => {
        if (localStorage.getItem('maxCounter') && localStorage.getItem('minCounter')) {
            setButtonsDisabling(isSet)
        }
    }
    const SettingsDisplayFlagsSettersProps = {setStartValue,setCounter,setMaxValue,setErrorFlag, disablingButtons}
    const OutputDisplayFlagsProps = {errorFlag, limitFlag, maxCounter, setLimitFlag
        // isResetDisabled
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
