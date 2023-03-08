/**
 * The properties of a single radio button.
 */
interface IRadioButtonProps {
    /** The on change callback. */
    onChange: (newValue: string) => void;
    /** Whether the radio button is disabled or not. */
    disabled?: boolean;
    /** The value that represents the radio button name. */
    name: string;
    /** The current value. */
    value: string;
    /** The label. */
    label: string;
}

export type { IRadioButtonProps };
