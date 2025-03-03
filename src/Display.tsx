import React from "react";
import {Button} from "./Button";

type Props = {
    counter: number;
    maxCounter: number;
    buttonsDisabled: boolean;
    errorFlag: boolean;
    onIncHandler: () => void;
    onResetHandler: () => void;
};

export const Display = ({
                            counter,
                            onResetHandler,
                            onIncHandler,
                            errorFlag,
                            buttonsDisabled,
                            maxCounter,
                        }: Props) => {
    const [buttonState, setButtonState] = React.useState({
            incDisabled: false,
            resetDisabled: true,
            limitFlag: false
        }
    );

    React.useEffect(() => {
        if (counter === maxCounter) {
            setButtonState({
                incDisabled: true,
                resetDisabled: false,
                limitFlag: true
            });
        } else if (counter === 0) {
            setButtonState({
                incDisabled: false,
                resetDisabled: true,
                limitFlag: false
            });
        } else {
            setButtonState({
                incDisabled: false,
                resetDisabled: false,
                limitFlag: false
            });
        }
        console.log(counter, maxCounter);
    }, [counter, maxCounter]);

    return (
        <div>
            <div className="display">
                <div className={'counter'}>
                    {errorFlag ? (
                        <div className="error">Invalid values</div>
                    ) : !errorFlag && buttonsDisabled ? (
                        <div>enter values and press 'set'</div>
                    ) : (
                        <div className={buttonState.limitFlag ? "error" : ''}>
                            {counter}
                        </div>
                    )}
                </div>
            </div>

            <div className="buttons_container">
                <Button
                    className={`button ${buttonState.incDisabled || buttonsDisabled ? 'button_disabled' : ''}`}
                    title={'Inc'}
                    onClick={onIncHandler}
                    disabled={buttonsDisabled || buttonState.incDisabled}
                />
                <Button
                    className={`button ${buttonState.resetDisabled || buttonsDisabled ? 'button_disabled' : ''}`}
                    title={'Reset'}
                    onClick={onResetHandler}
                    disabled={buttonsDisabled || buttonState.resetDisabled}
                />
            </div>
        </div>
    );
}

