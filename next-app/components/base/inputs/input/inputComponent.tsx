import React, { FunctionComponent, ReactElement } from 'react';

import Label from '../../label';
import { IInputProps } from './properties';

/**
 * Basic input.
 *
 * @param {IInputProps} props The component properties.
 * @returns {ReactElement} The input component.
 */
const Input: FunctionComponent<IInputProps> = (props): ReactElement => {
    return (
        <div className="form-control w-full max-w-full">
            {props.label && props.label !== '' && <Label text={props.label} />}
            <input
                disabled={props.disabled}
                className="input-bordered input"
                type={props.type === 'Number' ? 'number' : props.type === 'Password' ? 'password' : 'text'}
                min={props.min}
                value={props.value}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                onKeyDown={(e) => {
                    const isDeleteKey = e.key === 'Backspace';
                    const isComboKeyPressed = e.ctrlKey || e.metaKey;
                    const inputAsNumber = parseInt(e.key);
                    const isArrowKey = e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown';
                    if (props.type === 'Number' && isNaN(inputAsNumber) && !isDeleteKey && !isComboKeyPressed && !isArrowKey) {
                        e.preventDefault();
                        return;
                    }
                }}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default Input;
