import { ReactElement } from 'react';

/**
 * The properties of a basic button.
 */
interface IButtonProps {
    /** The action to execute on click. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /** Whether the button is disabled or not. */
    disabled?: boolean;
    /** The text displayed inside the button */
    text?: string;
    /** The react element to display the button icon. */
    icon?: ReactElement;
    /** Whether the action of the button is dangerous or not. */
    isDangerous?: boolean;
    /** Whether to display the button outlined or not. */
    outlined?: boolean;
    /** Whether the button shall be rendered full width or not. */
    fullWidth?: boolean;
}

/**
 * Basic button component.
 * @param {IButtonProps} props - The component properties.
 * @returns {ReactElement} The button element.
 */
export default function Button(props: IButtonProps): ReactElement {
    return (
        <button
            className={`${props.fullWidth ? 'w-full' : 'w-max'} p-3 ${props.outlined ? 'outline outline-1' : ''} ${props.isDangerous ? 'text-red-500 outline-red-500' : ''} rounded-lg h-max`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.icon}
            {props.text}
        </button>
    );
}
