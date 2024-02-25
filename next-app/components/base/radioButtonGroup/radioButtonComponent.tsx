import React, { FunctionComponent, ReactElement } from 'react';

import Label from '../label';
import { IRadioButtonProps } from './radioButtonProperties';

/**
 * Basic single radio button.
 * @param {IRadioButtonProps} props The component properties.
 * @returns {ReactElement} A single radio button component.
 */
const RadioButton: FunctionComponent<IRadioButtonProps> = (props): ReactElement => {
    return (
        <div className="flex items-center">
            <input onChange={() => props.onChange(props.value)} type="radio" className="radio mr-1" name={props.name} disabled={props.disabled} />
            <Label text={props.value} />
        </div>
    );
};

export default RadioButton;
