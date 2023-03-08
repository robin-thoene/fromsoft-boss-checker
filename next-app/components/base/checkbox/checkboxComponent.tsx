import React, { FunctionComponent, ReactElement } from 'react';

import Label from '../label';
import { ICheckBoxProps } from './properties';

/**
 * Basic checkbox.
 *
 * @param {ICheckBoxProps} props The component properties.
 * @returns {ReactElement} The checkbox component.
 */
const Checkbox: FunctionComponent<ICheckBoxProps> = (props): ReactElement => {
    return (
        <div className="flex max-w-max items-center">
            <input
                type="checkbox"
                checked={props.isChecked}
                className="checkbox no-animation"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => props.onChange(e.target.checked)}
                disabled={props.disabled}
            />
            {props.label && (
                <div className="ml-2">
                    <Label text={props.label} />
                </div>
            )}
        </div>
    );
};

export default Checkbox;
