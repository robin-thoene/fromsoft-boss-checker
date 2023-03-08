import { ReactNode } from 'react';

/**
 * The properties of the dialog component.
 */
interface IDialogProps {
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

export type { IDialogProps };
