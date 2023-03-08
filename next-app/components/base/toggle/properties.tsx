/**
 * The properties of a toggle.
 */
interface IToggleProps {
    /** The action to execute on click. */
    onChange: () => void;
    /** Whether the toggle is checked or not. */
    checked: boolean;
}

export type { IToggleProps };
