import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import Input from "./Input";


type Props = {
    startValue: number,
    maxValue: number,
    errorFlag: boolean,
    setStartValue: Dispatch<SetStateAction<number>>,
    setMaxValue: Dispatch<SetStateAction<number>>,
    setCounter: Dispatch<SetStateAction<number>>,
    setErrorFlag: Dispatch<SetStateAction<boolean>>,
    disablingDisplayButtons: (buttonsActive: boolean) => void,
};

export const SettingsDisplay = ({
                                    setStartValue,
                                    maxValue,
                                    startValue,
                                    errorFlag,
                                    setCounter,
                                    setErrorFlag,
                                    disablingDisplayButtons,
                                }: Props) => {
    const [localMax, setLocalMax] = React.useState<string>(maxValue.toString());
    const [localStart, setLocalStart] = React.useState<string>(startValue.toString());
    const [isSetButtonActive, activateSetButton] = React.useState<boolean>(true);

    React.useEffect(() => {
        let lStart = Number(localStart)
        let lMax = Number(localMax)
        let isInputError = lStart >= lMax || lStart < 0 || lMax < 0
        setErrorFlag(isInputError)
        activateSetButton(!isInputError)

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
            setStartValue(Number(localStart))
            setCounter(Number(localStart))
            activateSetButton(false)
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
                    valuesSetterHandler={valuesSetterHandler}
                />
                <Input
                    errorFlag={errorFlag}
                    title={'min value'}
                    value={localStart}
                    id={'start'}
                    valuesSetterHandler={valuesSetterHandler}
                />
            </div>
            <div className="buttons_container">
                <Button title={'set'}
                        className={`button ${isSetButtonActive ? '' : 'button_disabled'}`}
                        disabled={!isSetButtonActive}
                        onClick={onSetHandler}/>
            </div>
        </div>
    )
}