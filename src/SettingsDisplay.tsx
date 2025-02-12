import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import ExampleNumberField from "./NumberField";
// import TextField from '@mui/material/TextField';
// import { NumberField } from '@base-ui-components/react/number-field';
// import ExampleNumberField from "./NumberField";
// import TextInputWithSpinner from "./NumberField";

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
    const [isSetButtonActive, activateSetButton] = React.useState<boolean>(true);


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
    const inputValueFiltering = (numberToFilter: string) => {
        console.log(typeof numberToFilter)
        let filteredValue = numberToFilter.replace(/[^0-9]/g, '')//delete all symbols except numbers 0-9
        filteredValue = filteredValue.replace(/^0+/, '') //delete all zeros before number
        return Number(filteredValue)

    }
    const maxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        setLocalMax(inputValueFiltering(inputValue))
        changingValues()
    }
    const startHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        setLocalStart(inputValueFiltering(inputValue))
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
                    <ExampleNumberField defaultValue={localMax} onValueChange={maxHandler} />
                    {/*<TextInputWithSpinner/>*/}
                    {/*<TextField className={`input ${errorFlag ? 'error_input' : ''}`}*/}
                    {/*           type={"number"}*/}
                    {/*           onChange={maxHandler}*/}
                    {/*           value={localMax}*/}
                    {/*           inputProps={{min: '0'}}/>*/}

                    {/*/>*/}
                    {/*<input className={`input ${errorFlag ? 'error_input' : ''}`} type={"number"}*/}
                    {/*       onChange={maxHandler}*/}
                    {/*       value={localMax}*/}
                    {/*       min='0'*/}
                    {/*/>*/}
                </div>
                <div className="display_row">
                    <p>start value</p>
                    <input className={`input ${errorFlag ? 'error_input' : ''}`}
                           type={"number"}
                           onChange={startHandler}
                           value={localStart}
                           min='0'/>
                </div>
            </div>
            <div className="buttons_container">
                <Button title={'set'} className={`button ${isSetButtonActive ? '' : 'button_disabled'}`}
                        disabled={!isSetButtonActive} onClick={onSetHandler}/>
            </div>
        </div>
    )
}