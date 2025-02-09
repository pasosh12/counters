import * as React from 'react';
import {Button} from "./Button";
import {Dispatch, SetStateAction} from "react";

type Props = {
    startValue: number,
    setStartValue: Dispatch<SetStateAction<number>>,
    maxValue: number,
    setMaxValue: Dispatch<SetStateAction<number>>,
    setCounter: Dispatch<SetStateAction<number>>,
    errorFlag: boolean,
    setErrorFlag: Dispatch<SetStateAction<boolean>>,
    disablingButtons: (isSet: boolean) => void,
    setMessageActive: Dispatch<SetStateAction<boolean>>,
};

export const SettingsDisplay = ({
                                    setStartValue,
                                    maxValue,
                                    errorFlag,
                                    setCounter,
                                    setErrorFlag,
                                    disablingButtons,
                                    setMessageActive
                                }: Props) => {
    const [localMax, setLocalMax] = React.useState<number>(maxValue);
    const [localStart, setLocalStart] = React.useState<number>(0);
    const [isSetButtonActive, activateSetButton] = React.useState<boolean>(false);


    React.useEffect(() => {
        setErrorFlag(localStart >= localMax || localStart < 0 || localMax < 0)
    }, [localStart, localMax, setErrorFlag]);

    const changingValues = () => {
        disablingButtons(true)
        activateSetButton(true)
        setMessageActive(true)
        setCounter(0)
        localStorage.removeItem('minCounter');
        localStorage.removeItem('maxCounter');
    }
    const maxHandler = (value: number) => {
        setLocalMax(Number(value))
        changingValues()
    }
    const startHandler = (value: number) => {
        setLocalStart(Number(value))
        changingValues()
    }

    const onSetHandler = () => {

        if (!errorFlag) { //error
            setStartValue(localStart)
            setCounter(localStart)
            localStorage.setItem('minCounter', String(localStart));
            localStorage.setItem('maxCounter', String(localMax));
            disablingButtons(false)
            activateSetButton(false)
            setMessageActive(false)
        }
    }

    return (
        <div>
            <div className="display">
                <div className="display_row">
                    <p>max value</p>
                    <input className={`input ${errorFlag ? 'error_input' : ''}`} type={"number"}
                           onChange={(e) => maxHandler(Number(e.currentTarget.value))}
                           value={localMax}/>
                </div>
                <div className="display_row">
                    <p>start value</p>
                        <input className={`input ${errorFlag ? 'error_input' : ''}`} type={"number"}
                               onChange={(e) => startHandler(Number(e.currentTarget.value))}
                               value={localStart}/>
                </div>
            </div>
            <div className="buttons_container">
                <Button title={'set'} className={`button ${isSetButtonActive ? '' : 'button_disabled'}`}
                        disabled={!isSetButtonActive} onClick={onSetHandler}/>
            </div>
        </div>
    )
}