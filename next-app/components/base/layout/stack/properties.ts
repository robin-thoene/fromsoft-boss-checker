import { ReactNode } from 'react';

import { TailwindSize } from '../../../../types';
import { StackHorizontalAlign, StackVerticalAlign } from './enumerations';

/**
 * Properties for the stack component.
 */
interface IStackProps {
    /** The children to render inside the stack. */
    children: ReactNode;
    /** Whether to stack children horizontally or not. */
    horizontal?: boolean;
    /** Whether to use flex wrap or not. */
    wrap?: boolean;
    /** The horizontal align inside the stack. */
    horizontalAlign?: StackHorizontalAlign;
    /** The vertical align inside the stack. */
    verticalAlign?: StackVerticalAlign;
    /** The desired height. */
    height?: TailwindSize;
    /** The desired width. */
    width?: TailwindSize;
    /** The desired max height. */
    maxHeight?: TailwindSize;
    /** The desired max width. */
    maxWidth?: TailwindSize;
    /** The size of the gap. */
    gapSize?: TailwindSize;
    /** The size of the padding. */
    paddingSize?: TailwindSize;
}

export type { IStackProps };
