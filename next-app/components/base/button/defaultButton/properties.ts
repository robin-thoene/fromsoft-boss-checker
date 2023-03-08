import { IButtonProps } from '../properties';

/**
 * The properties of a single default button.
 */
interface IDefaultButtonProps extends IButtonProps {
    /** The text displayed inside the button */
    text: string;
    /** Whether the button shall be rendered full width or not. */
    fullWidth?: boolean;
}

export type { IDefaultButtonProps };
