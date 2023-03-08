import React, { FunctionComponent, ReactElement } from 'react';

import BusySpinner from '../../busy/busySpinner';
import { IIconButtonProps } from './properties';

/**
 * The icon button.
 *
 * @param {IIconButtonProps} props The component properties.
 * @returns {ReactElement} The icon button component.
 */
const IconButton: FunctionComponent<IIconButtonProps> = (props): ReactElement => {
    return (
        <button
            aria-label={props.ariaLabel}
            className={`btn-ghost btn flex h-max max-h-max min-h-full w-max ${props.padding !== undefined ? `p-${props.padding}` : 'p-3'} ${
                props.additionalClassNames ? props.additionalClassNames : ''
            }`}
            onClick={props.onClick}
            disabled={props.disabled || props.isBusy}
        >
            {props.isBusy ? <BusySpinner /> : props.icon}
        </button>
    );
};

export default IconButton;
