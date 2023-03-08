import { ReactElement } from 'react';

import { PanelSize } from './enumerations';

/**
 * Properties for the panel component.
 */
interface IPanelProps {
    /** Whether the panel is open or not. */
    isOpen: boolean;
    /** The callback to close the panel. */
    close: () => void;
    /** The title to display. */
    title?: string;
    /** Whether to disable light dismiss or not. */
    isBlocking?: boolean;
    /** The content to render inside the panel. */
    content: ReactElement;
    /** The content to render on the footer. */
    footer?: ReactElement;
    /** The desired panel size. */
    size?: PanelSize;
}

export type { IPanelProps };
