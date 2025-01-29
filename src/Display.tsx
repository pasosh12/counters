import React from "react";
import {Button} from "./Button";

type Props = {
    limitFlag: boolean;
    counter: number;
    onIncHandler: () => void;
    onResetHandler: () => void;
    isResetDisabled: boolean;
    isIncDisabled: boolean;
    buttonsDisabled: boolean;
    errorFlag: boolean;
    isMessageActive: boolean;
};
export const Display = ({
                            counter, limitFlag, onResetHandler, onIncHandler,
                            isResetDisabled, isIncDisabled, errorFlag, buttonsDisabled,
                            isMessageActive
                        }: Props) => {
    return (
        <div>
            <div className="display">
                {errorFlag ? <div className={"error"}>Invalid values</div> :
                    (isMessageActive ? <div>enter values and press 'set'</div> :
                            <div className={limitFlag ? "error" : ''}>{counter}</div>
                    )
                }
                <br/>
            </div>
            <div className="buttons">
                <Button className={isIncDisabled || buttonsDisabled ? 'button_disabled' : 'button'} title={'Inc'}
                        onClick={onIncHandler} disabled={buttonsDisabled || isIncDisabled}/>
                <Button
                    className={isResetDisabled || counter === 0 || buttonsDisabled ? 'button_disabled' : 'button'}
                    title={'Reset'}
                    onClick={onResetHandler} disabled={buttonsDisabled || isResetDisabled}/>
            </div>
        </div>
    )
        ;
};