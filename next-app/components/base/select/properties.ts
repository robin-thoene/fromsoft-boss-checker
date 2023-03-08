import { IOption } from './types';

/**
 * Properties of the select component.
 */
interface ISelectProps {
    /** The available options. */
    options: IOption[];
    /** The currently selected option. */
    selectedOptions: IOption[];
    /** The optional label to display. */
    label?: string;
    /** Whether multi select is enabled or not. */
    multiSelect?: boolean;
    /** The callback to execute on selection changes. */
    onChange: (newValue: IOption[]) => void;
}

export type { ISelectProps };
