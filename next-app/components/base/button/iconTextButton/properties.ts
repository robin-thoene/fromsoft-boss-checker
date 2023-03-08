import { ReactElement } from 'react';

import { IButtonProps } from '../properties';

/**
 * The properties of a single icon and text button.
 */
interface IIconTextButtonProps extends IButtonProps {
    /** The icon displayed inside the button */
    icon: ReactElement;
    /** The text displayed inside the button */
    text: string;
    /** Whether the button shall be rendered full width or not. */
    fullWidth?: boolean;
    /** Whether to use the secondary color for the text or not. */
    useSecondaryColor?: boolean;
}

export type { IIconTextButtonProps };
