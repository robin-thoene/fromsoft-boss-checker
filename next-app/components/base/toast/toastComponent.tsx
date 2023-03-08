import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { FunctionComponent, ReactElement } from 'react';

import IconButton from '../button/iconButton';
import { IToastProps } from './properties';

/**
 * Display a message globally available.
 *
 * @param {IToastProps} props The component properties.
 * @returns {ReactElement} The toast component.
 */
const Toast: FunctionComponent<IToastProps> = (props): ReactElement => (
    <div className="toast-center toast w-1/2">
        <div
            className={`alert py-2 ${
                props.type === 'Success' ? 'alert-success' : props.type === 'Error' ? 'alert-error' : props.type === 'Warning' ? 'alert-warning' : 'alert-info'
            }`}
        >
            <div className="flex w-full items-center justify-between">
                <span>{props.message}</span>
                {props.dismiss && <IconButton icon={<XMarkIcon className="h-4 w-4" />} onClick={props.dismiss} />}
            </div>
        </div>
    </div>
);

export default Toast;
