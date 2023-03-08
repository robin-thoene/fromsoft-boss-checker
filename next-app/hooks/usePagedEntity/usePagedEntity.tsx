import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { SortDirection } from '../../enumerations';
import { postToApi } from '../../helper/apiHelper';
import { IPagedRequest, IPagedResponse } from '../../types';
import { IUsePagedEntityOptions, IUsePagedEntityResult } from './types';

/**
 * Standardized paged request for a specified entity.
 *
 * @template T The type of the entity.
 * @param {IUsePagedEntityOptions} options The options to configure the paged entity query.
 * @returns {IUsePagedEntityResult<T>}  The result of the entity query.
 */
const usePagedEntity = <T,>(options: IUsePagedEntityOptions): IUsePagedEntityResult<T> => {
    /** Store the current page number. */
    const [page, setPage] = useState<number>(options.initialPagedRequestOptions?.pageToDeliver ? options.initialPagedRequestOptions.pageToDeliver : 1);
    /** Store the current maximum available page number. */
    const [maxPages, setMaxPages] = useState(1);
    /** Store the current sort direction. */
    const [sortDirection, setSortDirection] = useState<SortDirection>(
        options.initialPagedRequestOptions?.sortDirection ? options.initialPagedRequestOptions.sortDirection : SortDirection.Undefined,
    );
    /** Store the current sort property name. */
    const [sortPropertyName, setSortPropertyName] = useState<string | undefined>(options.initialPagedRequestOptions?.sortPropertyName);
    /** Store the current search value. */
    const [searchValue, setSearchValue] = useState<string>(options.initialPagedRequestOptions?.filterText ?? '');

    /** When the search value changes, reset to page one. */
    useEffect(() => {
        setPage(1);
    }, [searchValue]);

    /** Create the query. */
    const query = useQuery<IPagedResponse<T>>(
        [`entity-${options.entityName.toLowerCase()}`, page, sortPropertyName, sortDirection, searchValue],
        async () => {
            const requestBody: IPagedRequest = {
                itemsPerPage: options.initialPagedRequestOptions?.itemsPerPage ? options.initialPagedRequestOptions?.itemsPerPage : 25,
                pageToDeliver: page,
                sortDirection: sortDirection,
                sortPropertyName: sortPropertyName,
                filterText: searchValue,
            };
            const result = await postToApi<IPagedResponse<T>>(
                `${options.relativePagedEndpointPath ? options.relativePagedEndpointPath : `${options.entityName}/Paged`}`,
                requestBody,
            );
            return result;
        },
        {
            // This will let already fetched data stay valid for 5 minutes, so it will be not re-fetched until the 5 minutes expire.
            staleTime: 300000,
        },
    );

    /** Handle updates in the count of maximum available pages. */
    useEffect(() => {
        if (query.data?.pagesAvailable && query.data?.pagesAvailable !== maxPages) {
            setMaxPages(query.data?.pagesAvailable);
        }
    }, [maxPages, query.data?.pagesAvailable]);

    /** The result to return. */
    const result: IUsePagedEntityResult<T> = useMemo(() => {
        return {
            data: query.data?.results ?? [],
            page: page,
            maxPages: maxPages,
            initialSortDirection: options.initialPagedRequestOptions?.sortDirection,
            initialSortPropertyName: options.initialPagedRequestOptions?.sortPropertyName,
            isFetching: query.isFetching,
            next: () => setPage(page + 1),
            previous: () => setPage(page - 1),
            updateSortDirection: setSortDirection,
            updateSortPropertyName: setSortPropertyName,
            updateSearchValue: setSearchValue,
        };
    }, [maxPages, options.initialPagedRequestOptions?.sortDirection, options.initialPagedRequestOptions?.sortPropertyName, page, query.data?.results, query.isFetching]);

    return result;
};

export default usePagedEntity;
