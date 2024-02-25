import React, { FunctionComponent, ReactElement } from 'react';

import { IToggleProps } from './properties';

/**
 * Toggles between active and inactive.
 * @param {IToggleProps} props The component properties.
 * @returns {ReactElement} The toggle component.
 */
const Toggle: FunctionComponent<IToggleProps> = (props): ReactElement => {
    return <input type="checkbox" className="toggle" onChange={props.onChange} checked={props.checked}></input>;
};

export default Toggle;
