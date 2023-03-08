/**
 * Model for a paged response.
 */
interface IPagedResponse<T> {
    /** The available items. */
    itemsAvailable: number;
    /** The item count per page. */
    itemsPerPage: number;
    /** The total item count. */
    itemsTotal: number;
    /** The delivered page. */
    page: number;
    /** The max number of available pages. */
    pagesAvailable: number;
    /** The typed result set. */
    results: T[];
}

export type { IPagedResponse };
