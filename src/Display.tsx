import React, {useState} from "react";
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
                            onResetHandler, onIncHandler,
                            errorFlag, buttonsDisabled,
                            maxCounter,
                        }: Props) => {
    const [incDisabled, setIncDisabled] = useState(true);
    const [resetDisabled, setResetDisabled] = useState(true)
    const [limitFlag, setLimitFlag] = useState<boolean>(false);

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
                        (!errorFlag && buttonsDisabled ? <div>enter values and press 'set'</div> :
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