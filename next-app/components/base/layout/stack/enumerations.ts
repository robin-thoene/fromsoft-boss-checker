/**
 * Possible values for the vertical align of items inside the stack.
 */
const Stack_Vertical_Align = {
    Undefined: 0,
    Start: 1,
    End: 2,
    Center: 3,
    Baseline: 4,
    Stretch: 5,
} as const;

type StackVerticalAlign = keyof typeof Stack_Vertical_Align;

/**
 * Possible values for the horizontal align of items inside the stack.
 */
const Stack_Horizontal_Align = {
    Undefined: 0,
    Start: 1,
    End: 2,
    Center: 3,
    SpaceBetween: 4,
    SpaceAround: 5,
    SpaceEvenly: 6,
} as const;

type StackHorizontalAlign = keyof typeof Stack_Horizontal_Align;

export type { StackHorizontalAlign, StackVerticalAlign };
