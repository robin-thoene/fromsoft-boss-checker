import { ReactNode } from 'react';

import { TooltipDirection } from './enumerations';

/**
 * The properties of the tooltip component.
 */
interface ITooltipProps {
    /** The children to target with the tooltip. */
    children: ReactNode;
    /** The text to display inside the tooltip. */
    text: string;
    /** The direction of the tooltip. */
    direction?: TooltipDirection;
}

export type { ITooltipProps };
