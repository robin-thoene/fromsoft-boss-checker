import { ReactElement } from 'react';

import { TailwindSize } from '../../../../types';
import { IButtonProps } from '../properties';

/**
 * The properties of a single icon button.
 */
interface IIconButtonProps extends IButtonProps {
    /** The icon displayed inside the button */
    icon: ReactElement;
    /** The additional class names to apply. */
    additionalClassNames?: string;
    /** The optional padding to use. */
    padding?: TailwindSize;
}

export type { IIconButtonProps };
