/**
 * Properties for a text area.
 */
interface ITextAreaProps {
    /** The current value. */
    value: string | number;
    /** The on change callback. */
    onChange?: (newValue: string) => void;
    /** The placeholder to display until a value is entered. */
    placeholder?: string;
    /** The optional label to display. */
    label?: string;
    /** The fixed number of rows to display. */
    rows?: number;
    /** Whether the textarea is resizable or not. */
    isResizable?: boolean;
    /** Whether the input is disabled or not. */
    disabled?: boolean;
}

export type { ITextAreaProps };
