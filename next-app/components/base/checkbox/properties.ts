/**
 * The properties of a checkbox.
 */
interface ICheckBoxProps {
    /** The mutable state regarding whether the checkbox shall appear checked or not. */
    isChecked: boolean;
    /** The method to execute when checkbox value changes. */
    onChange: (newValue: boolean) => void;
    /** The optional label to display. */
    label?: string;
    /** Whether the checkbox is disabled or not. */
    disabled?: boolean;
}

export type { ICheckBoxProps };
