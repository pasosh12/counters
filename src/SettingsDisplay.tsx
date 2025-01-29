// @flow
import * as React from 'react';
import {Button} from "./Button";
import {Dispatch, SetStateAction, useRef} from "react";

type Props = {
    startValue: number,
    setStartValue: Dispatch<SetStateAction<number>>,
    maxValue: number,
    setMaxValue: Dispatch<SetStateAction<number>>,
    setCounter: Dispatch<SetStateAction<number>>,
    setErrorFlag: Dispatch<SetStateAction<boolean>>
};

export const SettingsDisplay = ({
                                    startValue,
                                    setStartValue,
                                    maxValue,
                                    setMaxValue,
                                    setCounter,
                                    setErrorFlag
                                }: Props) => {
    const [localMax, setLocalMax] = React.useState<number>(maxValue);
    const [localStart, setLocalStart] = React.useState<number>(0);
    const [localError, setLocalError] = React.useState<boolean>(false);


    React.useEffect(() => {
        // if (localStart === '' || localMax === '') {
        //     setLocalStart(Number(localStart));
        //     setLocalMax(Number(localMax));
        //     setLocalError(true);
        // } else {
            setLocalError(localStart >= localMax || localStart < 0 || localMax < 0);
        setErrorFlag(localStart >= localMax || localStart < 0 || localMax < 0)
        // }
    }, [localStart, localMax]);

    const maxHandler = (value: number) => {

        setLocalMax(Number(value))
        // setLocalError(localStart >= localMax || localStart < 0 || localMax < 0)
        // setErrorFlag(localError)
    }
    const startHandler = (value:number) => {

            setLocalStart(Number(value))
        // setLocalError(localStart >= localMax || localStart < 0 || localMax < 0)
        // setErrorFlag(localError)
        console.log('localStart', localStart, 'localMax', localMax);
    }
    // else {
    //     setLocalStart(Number(value))
    //     setLocalError(true);
    // }

    const onSetHandler = () => {
        // setLocalError(checkError()) //error === true
        setErrorFlag(localError)
        // console.log('localStart', localStart, 'localMax', localMax);
        // console.log(localError);
        if (!localError) { //error
            setStartValue(localStart)
            setCounter(localStart)
            disablingButtons(false)
            //     setMaxValue(localMax)
            // setLocalError(true)
        }
    }

// localStart<0 localStart===maxValue ---> error
    return (
        <div className="display">
            max value {localError ? <div>error</div> : ''}
            <input type={"number"} onChange={(e) => maxHandler(Number(e.currentTarget.value))}
                   value={localMax}/>
            start value
            <input className={localError? 'error_input' : ''} type={"number"} onChange={(e) => startHandler(Number(e.currentTarget.value))}
                   value={localStart}/>
            <div className="buttons">
                <Button title={'set'} onClick={onSetHandler}/>
            </div>
        </div>

    )
}