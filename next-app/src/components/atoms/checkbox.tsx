import { ReactElement } from 'react';

/**
 * The properties of a checkbox.
 */
interface ICheckboxProps {
    /** The mutable state regarding whether the checkbox shall appear checked or not. */
    isChecked: boolean;
    /** The method to execute when checkbox value changes. */
    onChange: (newValue: boolean) => void;
    /** Whether the checkbox is disabled or not. */
    disabled?: boolean;
}

/**
 * Basic check box component.
 * @param {ICheckboxProps} props - The component properties.
 * @returns {ReactElement} The rendered check box.
 */
export default function Checkbox(props: ICheckboxProps): ReactElement {
    return (
        <input
            type="checkbox"
            className="accent-blue-300 h-5 w-5"
            checked={props.isChecked}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => props.onChange(e.target.checked)}
            disabled={props.disabled}
        />
    );
}
