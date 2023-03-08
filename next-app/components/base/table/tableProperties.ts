import { ColumnDef } from '@tanstack/react-table';

import { SortDirection } from '../../../enumerations';
import { IUsePagedEntityResult } from '../../../hooks/usePagedEntity/types';

/**
 * Properties for the table component.
 */
interface ITableProps<TData> {
    /** The columns definitions. */
    columns: ColumnDef<TData>[];
    /** The unique identifier of the column the table is sorted by initially. */
    initialSortedColumnId?: string;
    /** The sort direction the table is sorted by initially. */
    initialSortDirection?: SortDirection;
    /** Callback to update the property name of the property to sort by. */
    updateSortProperty?: (propertyName?: string) => void;
    /** Callback to update the sort direction. */
    updateSortDirection?: (newSortDirection: SortDirection) => void;
    /** The data to display. */
    data?: TData[];
    /** The currently displayed page, if paging is used. */
    page?: number;
    /** The maximum available pages, if paging is used. */
    maxPages?: number;
    /** The callback to navigate to the next page, if paging is used. */
    next?: () => void;
    /** The callback to navigate to the previous page, if paging is used. */
    previous?: () => void;
    /** Whether the table is currently busy or not. */
    isBusy?: boolean;
    /** The use paged entity result to enable the table to manage everything by itself. */
    usePagedEntityResult?: IUsePagedEntityResult<TData>;
    /** Callback to update the list of checked items. If given, multi select is enabled inside the table. */
    updateCheckedItems?: (newCheckedItems: TData[]) => void;
    /** The name of the identifying property. Must be set to enable multi checking. */
    identifierPropertyName?: string;
    /** The callback to trigger the search. If set, the search bar is rendered in the table interactions area. */
    onSearch?: (searchValue: string) => void;
    /** If set, no interactions bar is rendered above the table. */
    disableTableInteractionsBar?: boolean;
    /** The callback to execute when the table row is clicked. */
    onRowClick?: (item: TData) => void;
}

export type { ITableProps };
