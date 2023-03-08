/**
 * Available types for a tooltip direction.
 */
const Tooltip_Direction = {
    Undefined: 0,
    Top: 1,
    Right: 2,
    Bottom: 3,
    Left: 4,
} as const;

type TooltipDirection = keyof typeof Tooltip_Direction;

export type { TooltipDirection };
