import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    title: string,
    id: string,
    value: string,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    errorFlag: boolean,
    valuesSetterHandler: (event: ChangeEvent<HTMLInputElement>) => void,
}
const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    // Запрещаем ввод точки
    if (event.key === '.') {
        event.preventDefault();
    }
};
const Input = (props: InputPropsType) => {
    return (
        <div className="display_row">
            <p>{props.title}</p>
            <input className={`input ${props.errorFlag ? 'error_input' : ''}`}
                   type={"number"}
                   onChange={props.valuesSetterHandler}
                   value={props.value.toString()}
                   id={props.id}
                   pattern="\d*"
                   onKeyDown={onKeyPressHandler}
            />
        </div>
    );
};

export default Input;