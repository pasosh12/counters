import * as React from 'react';
import { NumberField } from '@base-ui-components/react/number-field';
import styles from './NumberField.module.css';
import {ChangeEvent} from "react";

type Props = {
    defaultValue:number;
    onValueChange: (event: ChangeEvent<HTMLInputElement>) => void,
}
export default function ExampleNumberField({defaultValue}:Props) {
    const id = React.useId();
    return (
        <NumberField.Root id={id} defaultValue={defaultValue} className={styles.Field}>

            <NumberField.Group className={styles.Group}>
                <NumberField.Decrement className={styles.Decrement}>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input type={"text"} defaultValue={defaultValue} className={styles.Input} />
                <NumberField.Increment className={styles.Increment}>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    );
}


function PlusIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
        </svg>
    );
}

function MinusIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 5H10" />
        </svg>
    );
}
