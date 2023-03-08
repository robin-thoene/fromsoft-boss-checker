import { ReactNode } from 'react';

/**
 * The properties for the basic layout component.
 */
interface IBasicLayoutProps {
    /** The children to render. */
    children: ReactNode;
    /** Whether to enable a global search bar or not. */
    enableGlobalSearch?: boolean;
}

export type { IBasicLayoutProps };
