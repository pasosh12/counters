// @flow

import {ButtonHTMLAttributes} from "react";

// type Props = {
//     isDisabled?: boolean,
//     title?: string,
//     onClick?: () => void,
//     className?:string,
//     disabled: boolean,
// };
type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className, title, onClick, disabled}: Props) => {
    return (
            <button className={className} title={title} onClick={onClick} disabled={disabled}>{title}</button>
    );
};