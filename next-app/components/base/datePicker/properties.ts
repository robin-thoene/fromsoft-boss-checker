/**
 * Properties for the date picker component
 */
interface IDatePickerProps {
    /** The date to display. */
    date: Date;
    /** The minimum date value that is considered valid. */
    minDate?: Date;
    /** The maximum date value that is considered valid. */
    maxDate?: Date;
    /** The callback to call when the date changes. */
    onChange: (date: Date) => void;
    /** The label to display. */
    label?: string;
}

export type { IDatePickerProps };
