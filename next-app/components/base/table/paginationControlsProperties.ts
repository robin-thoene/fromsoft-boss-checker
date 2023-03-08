/**
 * The properties for the pagination controls.
 */
interface IPaginationControlsProps {
    /** The currently displayed page. */
    page: number;
    /** The maximum available pages. */
    maxPages: number;
    /** The callback to navigate to the next page. */
    next: () => void;
    /** The callback to navigate to the previous page. */
    previous: () => void;
}

export type { IPaginationControlsProps };
