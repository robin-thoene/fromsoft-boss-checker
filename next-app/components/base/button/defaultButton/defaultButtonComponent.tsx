import React, { FunctionComponent, ReactElement } from 'react';

import BusySpinner from '../../busy/busySpinner';
import { IDefaultButtonProps } from './properties';

/**
 * The default button.
 * @param {IDefaultButtonProps} props The component properties.
 * @returns {ReactElement} The default button component.
 */
const DefaultButton: FunctionComponent<IDefaultButtonProps> = (props): ReactElement => {
    return (
        <button aria-label={props.ariaLabel} className={`btn-ghost btn ${props.fullWidth ? 'w-full' : 'w-max'}`} onClick={props.onClick} disabled={props.disabled || props.isBusy}>
            <div className="flex items-center justify-center gap-2">
                {props.isBusy && <BusySpinner />}
                {props.text}
            </div>
        </button>
    );
};

export default DefaultButton;
