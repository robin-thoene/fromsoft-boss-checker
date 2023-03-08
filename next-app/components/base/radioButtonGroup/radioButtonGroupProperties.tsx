/**
 * The properties of a default radio button group.
 */
interface IRadioButtonGroupProps {
    /** The group name. This is only necessary if there are multiple groups with the same values and labels.  */
    name?: string;
    /** The on change callback. */
    onChange: (newValue: string) => void;
    /** Whether the complete radio button group is disabled or not. */
    disabled?: boolean;
    /** The possible values to pick from. */
    values: string[];
    /** The optional label to render. */
    label?: string;
}

export type { IRadioButtonGroupProps };
