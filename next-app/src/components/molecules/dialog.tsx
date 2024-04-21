import { ReactElement, ReactNode } from 'react';

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
    /** Whether the confirmation of the dialog is possible dangerous. */
    isDangerous?: boolean;
    /** Whether the dialog is blocking or not. */
    isBlocking?: boolean;
    /** The text to display on the cancel button. If not given, the default text is used. */
    cancelText?: string;
    /** The text to display on the confirm button. If not given, the default text is used. */
    confirmText?: string;
}

/**
 * Basic dialog component.
 * @param {IDialogProps} props - The component properties.
 * @returns {ReactElement} The rendered dialog.
 */
export default function Dialog(props: IDialogProps): ReactElement {
    return props.isOpen ? (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-50" onClick={() => (props.isBlocking ? null : props.onClose())}>
            <div className="bg-white dark:bg-black border p-10" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold">{props.title}</h3>
                <div className="py-4">{props.children}</div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button text={props.cancelText ? props.cancelText : props.dic['close']} onClick={props.onClose} />
                    {props.onConfirm && (
                        <Button isDangerous={props.isDangerous} outlined text={props.confirmText ? props.confirmText : props.dic['confirm']} onClick={props.onConfirm} />
                    )}
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
