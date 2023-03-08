/**
 * Valid input types for a basic input.
 */
const Input_Type = {
    Undefined: 0,
    Text: 1,
    Number: 2,
    Password: 3,
} as const;

type InputType = keyof typeof Input_Type;

export type { InputType };
