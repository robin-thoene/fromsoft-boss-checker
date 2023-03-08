import { IButtonProps } from '../properties';

/**
 * The properties of a single primary button.
 */
interface IPrimaryButtonProps extends IButtonProps {
    /** The text displayed inside the button */
    text: string;
    /** Whether to render an outlined version or not. */
    outlined?: boolean;
    /** Whether the action of the button is dangerous or not. */
    isDangerous?: boolean;
    /** Whether the button shall be rendered full width or not. */
    fullWidth?: boolean;
}

export type { IPrimaryButtonProps };
