import { SortDirection } from '../../enumerations';

/**
 * Model for a paged request against the API.
 */
interface IPagedRequest {
    /** The filter text to apply. */
    filterText?: string;
    /** The desired items per page. */
    itemsPerPage?: number;
    /** The requested page. */
    pageToDeliver?: number;
    /** The sort direction. */
    sortDirection?: SortDirection;
    /** The name of the entity property to sort by. */
    sortPropertyName?: string;
}

export type { IPagedRequest };
