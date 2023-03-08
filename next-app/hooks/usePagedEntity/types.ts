import { SortDirection } from '../../enumerations';
import { IPagedRequest } from '../../types';

/**
 * Result model of the paged entity query.
 */
interface IUsePagedEntityResult<T> {
    /** The fetched page number. */
    page: number;
    /** The number of the maximum available pages. */
    maxPages: number;
    /** The fetched data. */
    data: T[];
    /** Whether there is currently a fetch request active or not. */
    isFetching: boolean;
    /** The initial sort direction if any is set. */
    initialSortDirection?: SortDirection;
    /** The initial sort property name if any is set. */
    initialSortPropertyName?: string;
    /** The callback to fetch the next page. */
    next: () => void;
    /** The callback to fetch the previous page. */
    previous: () => void;
    /** The callback to update the sort direction. */
    updateSortDirection: (newSortDirection: SortDirection) => void;
    /** The callback to update the sort property name. */
    updateSortPropertyName: (newSortPropertyName?: string) => void;
    /** The callback to update the search value. */
    updateSearchValue: (newSearchValue: string) => void;
}

/**
 * Model for the options used to configure the use paged entity hook.
 */
interface IUsePagedEntityOptions {
    /** The name of the entity. */
    entityName: string;
    /**
     * The relative API endpoint path to access the paged entity endpoint.
     * If not set, defaults to `entityName/Paged`
     */
    relativePagedEndpointPath?: string;
    /** The initial options regarding the paged request. */
    initialPagedRequestOptions?: IPagedRequest;
}

export type { IUsePagedEntityOptions, IUsePagedEntityResult };
