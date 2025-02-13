import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent, Dispatch, SetStateAction, KeyboardEvent} from "react";


type Props = {
    startValue: number,
    setStartValue: Dispatch<SetStateAction<number>>,
    maxValue: number,
    setMaxValue: Dispatch<SetStateAction<number>>,
    setCounter: Dispatch<SetStateAction<number>>,
    errorFlag: boolean,
    setErrorFlag: Dispatch<SetStateAction<boolean>>,
    disablingDisplayButtons: (isSet: boolean) => void,
    setMessageActive: Dispatch<SetStateAction<boolean>>,
};

export const SettingsDisplay = ({
                                    setStartValue,
                                    maxValue,
                                    errorFlag,
                                    setCounter,
                                    setErrorFlag,
                                    disablingDisplayButtons,
                                    setMessageActive
                                }: Props) => {
    const [localMax, setLocalMax] = React.useState<string>(maxValue.toString());
    const [localStart, setLocalStart] = React.useState<string>('0');
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
        setMessageActive(true)
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
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // Запрещаем ввод точки
        if (event.key === '.') {
            event.preventDefault();
        }
    };
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
            setMessageActive(false)
        }
    }

    return (
        <div>
            <div className="display">
                <div className="display_row">
                    <p>max value</p>
                    <input className={`input ${errorFlag ? 'error_input' : ''}`}
                           type={"number"}
                           onChange={valuesSetterHandler}
                           value={localMax.toString()}
                           id="max"
                           pattern="\d*"
                           onKeyDown={onKeyPressHandler}
                    />
                </div>
                <div className="display_row">
                    <p>start value</p>
                    <input className={`input ${errorFlag ? 'error_input' : ''}`}
                           type={"number"}
                           onChange={valuesSetterHandler}
                           value={localStart.toString()}
                           id="start"
                           pattern="\d*"
                           onKeyDown={onKeyPressHandler}

                    />
                </div>
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