import { ReactNode } from 'react';

import { Button } from '@/components/atoms';

/**
 * The properties of the dialog component.
 */
interface IDialogProps {
    /** The dictionary to use for translating texts. */
    dic: { [key: string]: string };
    /** Whether the dialog is open or not. */
    isOpen: boolean;
    /** Callback to close the dialog. */
    onClose: () => void;
    /** The confirm callback to execute. */
    onConfirm?: () => void;
    /** The title to display. */
    title: string;
    /** The content to display. */
    children?: ReactNode;
    /** Whether to disable light dismiss or not. */
    isBlocking?: boolean;
    /** Whether the confirmation of the dialog is possible dangerous. */
    isDangerous?: boolean;
    /** The text to display on the cancel button. If not given, the default text is used. */
    cancelText?: string;
    /** The text to display on the confirm button. If not given, the default text is used. */
    confirmText?: string;
}

/**
 * Basic dialog component.
 * @param {IDialogProps} props - The component properties.
 * @returns {IDialogProps} The rendered dialog.
 */
export default function Dialog(props: IDialogProps) {
    // TODO: Fix this because no daisyui classes are available anymore.
    return (
        <div className={`${props.isOpen ? 'bg-gray-500 bg-opacity-75 transition-opacity' : ''}`} onClick={() => (props.isBlocking ? null : props.onClose())}>
            <div className="" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold">{props.title}</h3>
                <div className="py-4">{props.children}</div>
                <div className="">
                    <Button text={props.cancelText ? props.cancelText : props.dic['close']} onClick={props.onClose} />
                    {props.onConfirm && (
                        <Button isDangerous={props.isDangerous} outlined text={props.confirmText ? props.confirmText : props.dic['confirm']} onClick={props.onConfirm} />
                    )}
                </div>
            </div>
        </div>
    );
}
