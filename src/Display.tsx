// @flow

import React from "react";
import {Button} from "./Button";

type Props = {
    limitFlag: boolean;
    counter: number;
    maxValue: number;
    onIncHandler:() => void;
    onResetHandler:() => void;
    isResetDisabled:boolean;
    isIncDisabled:boolean,
    errorFlag:boolean;
};
export const Display = ({maxValue, counter, limitFlag, onResetHandler, onIncHandler, isResetDisabled, isIncDisabled,errorFlag}: Props) => {
    return (
        <div className="display">

            {errorFlag ? <div className={"error"}>Invalid values</div> :
                <div className={limitFlag ? "error" : ''}>{counter}</div>}
            <br/>
            <div>Max Value: {maxValue}</div>

            <div className="buttons">
                <Button className={isIncDisabled ? 'button_disabled' : 'button'} title={'Inc'}
                        onClick={onIncHandler} disabled={isIncDisabled}/>
                <Button className={isResetDisabled || counter === 0 ? 'button_disabled' : 'button'}
                        title={'Reset'}
                        onClick={onResetHandler} disabled={isResetDisabled}/>
            </div>
        </div>
    )
        ;
};