import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import Input from "./Input";


type Props = {
    minCounter: number,
    maxCounter: number,
    errorFlag:  boolean,
    buttonsDisabled: boolean,
    setCounter: Dispatch<SetStateAction<number>>,
    setErrorFlag: Dispatch<SetStateAction<boolean>>,
    disablingDisplayButtons: (buttonsActive: boolean) => void,

};

export const SettingsDisplay = ({
                                    // setStartValue,
                                    maxCounter,
                                    minCounter,
                                    errorFlag,
                                    setCounter,
                                    setErrorFlag,
                                    disablingDisplayButtons,
                                    buttonsDisabled,


                                }: Props) => {
    const [localMax, setLocalMax] = React.useState<string>(maxCounter.toString());
    const [localStart, setLocalStart] = React.useState<string>(minCounter.toString());


    React.useEffect(() => {
        let lStart = Number(localStart)
        let lMax = Number(localMax)
        let isInputError = lStart >= lMax || lStart < 0 || lMax < 0
        setErrorFlag(isInputError)
        disablingDisplayButtons(Boolean(lStart) && Boolean(lMax))
    }, [localStart, localMax, setErrorFlag]);

    const changingValues = () => {
        disablingDisplayButtons(true)
        setCounter(0)
        localStorage.removeItem('minCounter');
        localStorage.removeItem('maxCounter');

    }
    const inputValueFiltering = (numberToFilter: string) => {
        // Удаляем точки и запятые
        let filteredValue = numberToFilter.replace(/[.,]/g, '');
        // Удаляем ведущие нули
        filteredValue = filteredValue.replace(/^0+/, '');
        // Если строка пустая, возвращаем '0'
        return filteredValue === '' ? '0' : filteredValue;
    }

    const valuesSetterHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value
        if (event.target.id === 'start') setLocalStart(inputValueFiltering(inputValue))
        else if (event.target.id === 'max') setLocalMax(inputValueFiltering(inputValue))
        changingValues()
    }

    const onSetHandler = () => {

        if (!errorFlag) { //error

            setCounter(Number(localStart))
            localStorage.setItem('minCounter', String(localStart));
            localStorage.setItem('maxCounter', String(localMax));
            disablingDisplayButtons(false)
        }
    }

    return (
        <div>
            <div className="display">
                <Input
                    errorFlag={errorFlag}
                    title={'max value'}
                    value={localMax}
                    id={'max'}
                    onChange={valuesSetterHandler}
                />
                <Input
                    errorFlag={errorFlag}
                    title={'min value'}
                    value={localStart}
                    id={'start'}
                    onChange={valuesSetterHandler}
                />
            </div>
            <div className="buttons_container">
                <Button title={'set'}
                        className={`button ${!errorFlag && buttonsDisabled ? '' : 'button_disabled'}`}
                        disabled={errorFlag  && buttonsDisabled}
                        onClick={onSetHandler}/>
            </div>
        </div>
    )
}