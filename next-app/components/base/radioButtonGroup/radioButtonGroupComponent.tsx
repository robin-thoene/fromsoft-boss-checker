import React, { FunctionComponent, ReactElement } from 'react';
import { v5 as uuidv5 } from 'uuid';

import Label from '../label';
import RadioButton from './radioButtonComponent';
import { IRadioButtonGroupProps } from './radioButtonGroupProperties';

/**
 * Basic radio button group.
 *
 * @param {IRadioButtonGroupProps} props The component properties.
 * @returns {ReactElement} A radio button group component.
 */
const RadioButtonGroup: FunctionComponent<IRadioButtonGroupProps> = (props: IRadioButtonGroupProps): ReactElement => {
    // Unique guid
    const radioButtonNamespace = '30dd9d47-047d-431b-9976-28d09270a5bf';
    // uuid v5 is a hash if used with a namespace, therefore the server and client props are the same (necessary for SSR)
    const groupName = props.name ?? uuidv5(props.values.join() + (props.label ? props.label : ''), radioButtonNamespace);
    return (
        <div className="form-control">
            {props.label && props.label !== '' && <Label text={props.label} />}
            {props.values.map((value, i) => (
                <div className="mb-1" key={`${value}-${i}`}>
                    <RadioButton onChange={props.onChange} value={value} name={groupName} disabled={props.disabled} label={value} />
                </div>
            ))}
        </div>
    );
};

export default RadioButtonGroup;
