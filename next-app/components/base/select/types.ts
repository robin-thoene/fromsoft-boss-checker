/**
 * Represents a single select option.
 */
interface IOption {
    /** The unique key of the option. */
    key: string | number;
    /** The value to render. */
    value: string;
}

export type { IOption };
