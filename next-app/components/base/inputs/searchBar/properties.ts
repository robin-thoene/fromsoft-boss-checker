/**
 * The properties of a search bar.
 */
interface ISearchBarProps {
    /** The callback to execute when the user submits the search value. */
    onSearch: (searchValue: string) => void;
    /** The placeholder to display until a value is entered. */
    placeholder?: string;
    /** The optional label to display. */
    label?: string;
    /** If set to true, a reset button is rendered which will reset the search value and will trigger the onSearch callback afterwards. */
    canBeCleared?: boolean;
}

export type { ISearchBarProps };
