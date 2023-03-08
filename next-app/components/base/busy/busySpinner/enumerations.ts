/**
 * Possible values for the busy spinner size.
 */
const Busy_Spinner_Size = {
    Undefined: 0,
    Small: 1,
    Medium: 2,
    Large: 3,
} as const;

type BusySpinnerSize = keyof typeof Busy_Spinner_Size;

export type { BusySpinnerSize };
