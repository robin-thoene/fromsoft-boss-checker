import { ToastType } from './enumerations';

/**
 * Properties of the toast component.
 */
interface IToastProps {
    /** The type of the toast. */
    type: ToastType;
    /** The message to display. */
    message: string;
    /** Callback to dismiss the toast. */
    dismiss?: () => void;
}

export type { IToastProps };
