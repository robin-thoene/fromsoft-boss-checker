import React, { FunctionComponent, ReactElement } from 'react';

import BusySpinner from '../../busy/busySpinner';
import { IPrimaryButtonProps } from './properties';

/**
 * The primary button.
 *
 * @param {IPrimaryButtonProps} props The component properties.
 * @returns {ReactElement} The primary button component.
 */
const PrimaryButton: FunctionComponent<IPrimaryButtonProps> = (props): ReactElement => {
    return (
        <button
            aria-label={props.ariaLabel}
            className={`btn ${props.outlined ? 'btn-outline' : ''} ${props.isDangerous ? 'btn-error' : 'btn-primary'} ${props.fullWidth ? 'w-full' : 'w-max'}`}
            onClick={props.onClick}
            disabled={props.disabled || props.isBusy}
        >
            <div className="flex items-center justify-center gap-2">
                {props.isBusy && <BusySpinner />}
                {props.text}
            </div>
        </button>
    );
};

export default PrimaryButton;
