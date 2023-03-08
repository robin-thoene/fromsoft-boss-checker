/**
 * Available types for a toast.
 */
const Toast_Type = {
    Undefined: 0,
    Info: 1,
    Warning: 2,
    Error: 3,
    Success: 4,
} as const;

type ToastType = keyof typeof Toast_Type;

export type { ToastType };
