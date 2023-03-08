/**
 * Possible values for the panel size.
 */
const Panel_Size = {
    Undefined: 0,
    Small: 1,
    Medium: 2,
    Large: 3,
} as const;

type PanelSize = keyof typeof Panel_Size;

export type { PanelSize };
