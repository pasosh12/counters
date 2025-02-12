import React, {Dispatch, SetStateAction, useState} from "react";
import {Button} from "./Button";

type Props = {
    limitFlag: boolean;
    counter: number;
    onIncHandler: () => void;
    onResetHandler: () => void;
    // isResetDisabled: boolean;
    // isIncDisabled: boolean;
    buttonsDisabled: boolean;
    errorFlag: boolean;
    isMessageActive: boolean;
    maxCounter:number;
    setLimitFlag: Dispatch<SetStateAction<boolean>>;
};
export const Display = ({
                            counter, limitFlag, onResetHandler, onIncHandler,
                            // isResetDisabled, isIncDisabled,
                            errorFlag, buttonsDisabled,
                            isMessageActive,
                            setLimitFlag,
    maxCounter,
                        }: Props) => {
    // const isIncDisabled = counter === maxCounter;
    // const isResetDisabled = counter === 0
    const [isIncDisabled, setIncDisabled] = useState(true);
    const [isResetDisabled,setResetDisabled] = useState(true)

    React.useEffect(() => {

        if (counter === maxCounter) {
            setLimitFlag(true);
            setIncDisabled(true);
            setResetDisabled(false)
        }
        else if(counter === 0){
            setLimitFlag(false);
            setIncDisabled(false);
            setResetDisabled(true)
        }
        else {
            setLimitFlag(false);
            setIncDisabled(false);
            setResetDisabled(false)
        }
    }, [counter, maxCounter])

    console.log(buttonsDisabled)
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
                <Button className={`button ${isIncDisabled || buttonsDisabled ? 'button_disabled' : ''}`}
                        title={'Inc'}
                        onClick={onIncHandler} disabled={(buttonsDisabled || isIncDisabled)}/>
                <Button
                    className={`button ${isResetDisabled || buttonsDisabled ? 'button_disabled' : ''}`}
                    title={'Reset'}
                    onClick={onResetHandler} disabled={(buttonsDisabled || isResetDisabled)}/>
            </div>
        </div>
    )
        ;
};