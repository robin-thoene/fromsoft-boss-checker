import { InputType } from './enumerations';

/**
 * Properties for a single input.
 */
interface IInputProps {
    /** The current value. */
    value: string | number;
    /** The on change callback. */
    onChange?: (newValue: string | number) => void;
    /** The placeholder to display until a value is entered. */
    placeholder?: string;
    /** The input type. */
    type?: InputType;
    /** The optional label to display. */
    label?: string;
    /** The allowed minimum value. */
    min?: string | number;
    /** Whether the input is disabled or not. */
    disabled?: boolean;
}

export type { IInputProps };
