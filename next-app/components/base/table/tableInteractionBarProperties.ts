/**
 * The properties for the table interaction component.
 */
interface ITableInteractionBarProps {
    /** The callback to trigger the search. If set, the search bar is rendered in the table interactions area. */
    onSearch?: (searchValue: string) => void;
}

export type { ITableInteractionBarProps };
