import React, {Dispatch, SetStateAction, useState} from "react";
import {Button} from "./Button";

type Props = {
    limitFlag: boolean;
    counter: number;
    onIncHandler: () => void;
    onResetHandler: () => void;
    buttonsDisabled: boolean;
    errorFlag: boolean;
    isMessageActive: boolean;
    maxCounter: number;
    setLimitFlag: Dispatch<SetStateAction<boolean>>;
};
export const Display = ({
                            counter, limitFlag, onResetHandler, onIncHandler,
                            errorFlag, buttonsDisabled,
                            isMessageActive,
                            setLimitFlag,
                            maxCounter,
                        }: Props) => {
    const [incDisabled, setIncDisabled] = useState(true);
    const [resetDisabled, setResetDisabled] = useState(true)

    React.useEffect(() => {

        if (counter === maxCounter) {
            setLimitFlag(true);
            setIncDisabled(true);
            setResetDisabled(false)
        } else if (counter === 0) {
            setLimitFlag(false);
            setIncDisabled(false);
            setResetDisabled(true)
        } else {
            setLimitFlag(false);
            setIncDisabled(false);
            setResetDisabled(false)
        }
    }, [counter, maxCounter])


    return (
        <div>
            <div className="display">
                <div className={'counter'}>
                    {errorFlag ? <div className={"error"}>Invalid values</div> :
                        (isMessageActive ? <div>enter values and press 'set'</div> :
                                <div className={limitFlag ? "error" : ''}>{counter}</div>
                        )
                    }
                </div>
            </div>

            <div className="buttons_container">
                <Button className={`button ${incDisabled || buttonsDisabled ? 'button_disabled' : ''}`}
                        title={'Inc'}
                        onClick={onIncHandler} disabled={(buttonsDisabled || incDisabled)}/>
                <Button
                    className={`button ${resetDisabled || buttonsDisabled ? 'button_disabled' : ''}`}
                    title={'Reset'}
                    onClick={onResetHandler} disabled={(buttonsDisabled || resetDisabled)}/>
            </div>
        </div>
    )
        ;
};