import * as React from 'react';
import {Button} from "./Button";
import {ChangeEvent} from "react";
import Input from "./Input";

type Props = {
    minCounter: number,
    maxCounter: number,
    errorFlag: boolean,
    buttonsDisabled: boolean,
    disablingDisplayButtons: (buttonsActive: boolean) => void,
    setInputValues: (start: number, max: number) => void,
    setErrorFlag: (isInputError: boolean) => void,
};

export const SettingsDisplay = ({
                                    maxCounter,
                                    minCounter,
                                    errorFlag,
                                    setInputValues,
                                    setErrorFlag,
                                    disablingDisplayButtons,
                                    buttonsDisabled,
                                }: Props) => {
    const [localMax, setLocalMax] = React.useState<string>(maxCounter.toString());
    const [localStart, setLocalStart] = React.useState<string>(minCounter.toString());

    const validateInputs = React.useCallback(() => {
        const lStart = Number(localStart);
        const lMax = Number(localMax);
        return lStart >= lMax || lStart < 0 || lMax < 0;
    }, [localStart, localMax]);

    // Only update error state when local values change
    React.useEffect(() => {
        const isError = validateInputs();
        if (isError !== errorFlag) {
            setErrorFlag(isError);
        }
    }, [localStart, localMax, validateInputs, errorFlag, setErrorFlag]);

    const inputValueFiltering = React.useCallback((numberToFilter: string) => {
        let filteredValue = numberToFilter.replace(/[.,]/g, '');
        filteredValue = filteredValue.replace(/^0+/, '');
        return filteredValue === '' ? '0' : filteredValue;
    }, []);

    const valuesSetterHandler = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const filteredValue = inputValueFiltering(inputValue);

        if (event.target.id === 'start') {
            setLocalStart(filteredValue);
        } else if (event.target.id === 'max') {
            setLocalMax(filteredValue);
        }
        disablingDisplayButtons(true);
    }, [inputValueFiltering, disablingDisplayButtons]);

    const onSetHandler = () => {
        if (!errorFlag) {
            localStorage.setItem('minCounter', localStart);
            localStorage.setItem('maxCounter', localMax);
            setInputValues(Number(localMax), Number(localStart));
            disablingDisplayButtons(false);
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
                <Button
                    title={'set'}
                    className={`button ${!errorFlag && buttonsDisabled ? '' : 'button_disabled'}`}
                    disabled={errorFlag || !buttonsDisabled}
                    onClick={onSetHandler}
                />
            </div>
        </div>
    );
}

