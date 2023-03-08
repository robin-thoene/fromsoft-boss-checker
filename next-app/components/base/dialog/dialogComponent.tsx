import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

import DefaultButton from '../button/defaultButton';
import PrimaryButton from '../button/primaryButton';
import { IDialogProps } from './properties';

/**
 * Basic dialog that opens as overlay to present information to the user and optionally receive input from the user.
 *
 * @param {IDialogProps} props The component properties.
 * @returns {ReactElement} The dialog component.
 */
const Dialog: FunctionComponent<IDialogProps> = (props): ReactElement => {
    /** Access to translations. */
    const { t } = useTranslation();

    return (
        <div className={`modal ${props.isOpen ? 'modal-open bg-gray-500 bg-opacity-75 transition-opacity' : ''}`} onClick={() => (props.isBlocking ? null : props.onClose())}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold">{props.title}</h3>
                <div className="py-4">{props.children}</div>
                <div className="modal-action">
                    <DefaultButton text={props.cancelText ? props.cancelText : t('close')} onClick={props.onClose} />
                    {props.onConfirm && (
                        <PrimaryButton isDangerous={props.isDangerous} outlined text={props.confirmText ? props.confirmText : t('confirm')} onClick={props.onConfirm} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
