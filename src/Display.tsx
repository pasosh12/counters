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
                <div className={'counter'}>
                {errorFlag ? <div className={"error"}>Invalid values</div> :
                    (isMessageActive ? <div>enter values and press 'set'</div> :
                            <div className={limitFlag ? "error" : ''}>{counter}</div>
                    )
                }
                </div>
            </div>

            <div className="buttons_container">
                <Button className={`button ${isIncDisabled && buttonsDisabled ? 'button_disabled' : ''}`} title={'Inc'}
                        onClick={onIncHandler} disabled={buttonsDisabled || isIncDisabled}/>
                <Button
                    className={`button ${isResetDisabled && buttonsDisabled ? 'button_disabled' : ''}`}
                    title={'Reset'}
                    onClick={onResetHandler} disabled={(buttonsDisabled || isResetDisabled)}/>
            </div>
        </div>
    )
        ;
};