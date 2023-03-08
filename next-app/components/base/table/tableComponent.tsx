import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/solid';
import { ColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import { SortDirection } from '../../../enumerations';
import useIsDarkModeEnabled from '../../../hooks/useIsDarkModeEnabled';
import Checkbox from '../checkbox';
import PaginationControls from './paginationControlsComponent';
import TableInteractionBar from './tableInteractionBarComponent';
import { ITableProps } from './tableProperties';

/**
 * Displays data in a table and provides optional interactions.
 *
 * To use, place the table component inside a `relative` container. The table will fill out the
 * whole container and handles scrolling itself.
 *
 * To use paging, set all relevant table properties regarding paging.
 *
 * To use just defaults, set only use paged entity result and let the table component manage the rest.
 *
 * @template TData The type of the data to display.
 * @param {ITableProps<TData>} props The table component properties.
 * @returns {ReactElement} The table component.
 */
const Table = <TData,>(props: ITableProps<TData>): ReactElement => {
    /** The width of the select column in px. */
    const selectColumnWidth = 56;

    /** Access to the dark mode. */
    const isDarkModeEnabled = useIsDarkModeEnabled();

    /** The table internal state of the sorting. */
    const [sorting, setSorting] = useState<SortingState>(
        props.initialSortedColumnId && props.initialSortDirection
            ? [
                  {
                      id: props.initialSortedColumnId,
                      desc: props.initialSortDirection === SortDirection.Descending,
                  },
              ]
            : props.usePagedEntityResult && props.usePagedEntityResult.initialSortDirection && props.usePagedEntityResult.initialSortPropertyName
            ? [
                  {
                      id: props.usePagedEntityResult.initialSortPropertyName,
                      desc: props.usePagedEntityResult.initialSortDirection === SortDirection.Descending,
                  },
              ]
            : [],
    );
    /** State of the currently checked items. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [checkedItems, setCheckedItems] = useState<any[]>([]);
    /** The row that was clicked last. */
    const [lastClickedRowItem, setLastClickedRowItem] = useState<TData>();

    /** Computed data based on table props. */
    const data = useMemo(() => (props.data ? props.data : props.usePagedEntityResult ? props.usePagedEntityResult.data : []), [props.data, props.usePagedEntityResult]);

    /** Computed columns based on set table props. */
    const columns = useMemo(() => {
        // TODO: Find a way to disable the re-render for the whole table on select.
        let cols = props.columns;
        if (props.updateCheckedItems && props.identifierPropertyName) {
            const selectCol: ColumnDef<TData> = {
                id: 'select',
                cell: (cellProps) => {
                    // Create copy of currently checked items to work on.
                    const tmpCheckedItems = [...checkedItems];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const obj = cellProps.row.original as any;
                    const identifier = obj[props.identifierPropertyName as string];
                    const index = tmpCheckedItems.findIndex((i) => i[props.identifierPropertyName as string] === identifier);
                    return (
                        <Checkbox
                            isChecked={index !== -1}
                            onChange={() => {
                                if (index === -1) {
                                    tmpCheckedItems.push(obj);
                                    // Add the item to the internal table state of checked item identifiers.
                                    setCheckedItems([...tmpCheckedItems]);
                                } else {
                                    // Remove the item from the internal table state of checked item identifiers.
                                    tmpCheckedItems.splice(index, 1);
                                    setCheckedItems([...tmpCheckedItems]);
                                }
                                if (props.updateCheckedItems) {
                                    props.updateCheckedItems([...tmpCheckedItems]);
                                }
                            }}
                        />
                    );
                },
                minSize: selectColumnWidth,
                maxSize: selectColumnWidth,
            };
            cols = [selectCol, ...cols];
        }
        return cols;
    }, [props, checkedItems]);

    /** Get the react-table. */
    const table = useReactTable({
        columns: columns,
        data: data,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        enableMultiSort: false,
        initialState: {
            sorting: sorting,
        },
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
    });

    /** Ensure valid property combinations. */
    useEffect(() => {
        const errorMessage = 'Invalid table property combination.';
        if (props.usePagedEntityResult) {
            if (
                props.data ||
                props.initialSortDirection ||
                props.initialSortedColumnId ||
                props.maxPages ||
                props.next ||
                props.previous ||
                props.updateSortDirection ||
                props.updateSortProperty ||
                props.page ||
                props.onSearch
            ) {
                throw new Error(errorMessage);
            }
        }
        if (props.updateCheckedItems && !props.identifierPropertyName) {
            throw new Error(errorMessage);
        }
        if (!props.updateCheckedItems && props.identifierPropertyName) {
            throw new Error(errorMessage);
        }
    }, [
        props.data,
        props.identifierPropertyName,
        props.initialSortDirection,
        props.initialSortedColumnId,
        props.maxPages,
        props.next,
        props.onSearch,
        props.page,
        props.previous,
        props.updateCheckedItems,
        props.updateSortDirection,
        props.updateSortProperty,
        props.usePagedEntityResult,
    ]);

    /** React on changes of the sorting. Currently only sorting one property is supported. */
    useEffect(() => {
        if (props.usePagedEntityResult) {
            const sortProp = sorting[0];
            if (!sortProp) {
                props.usePagedEntityResult.updateSortDirection(SortDirection.Undefined);
                props.usePagedEntityResult.updateSortPropertyName(undefined);
                return;
            }
            props.usePagedEntityResult.updateSortDirection(sortProp.desc ? SortDirection.Descending : SortDirection.Ascending);
            props.usePagedEntityResult.updateSortPropertyName(sortProp.id);
            return;
        }
        if (!props.updateSortProperty || !props.updateSortDirection) {
            return;
        }
        const sortProp = sorting[0];
        if (!sortProp) {
            props.updateSortDirection(SortDirection.Undefined);
            props.updateSortProperty(undefined);
            return;
        }
        props.updateSortDirection(sortProp.desc ? SortDirection.Descending : SortDirection.Ascending);
        props.updateSortProperty(sortProp.id);
        return;
    }, [props, sorting]);

    /** The callback to navigate to the next page. */
    const nextPage = useMemo(() => (props.next ? props.next : props.usePagedEntityResult ? props.usePagedEntityResult.next : null), [props.next, props.usePagedEntityResult]);
    /** The callback to navigate to the next page. */
    const previousPage = useMemo(
        () => (props.previous ? props.previous : props.usePagedEntityResult ? props.usePagedEntityResult.previous : null),
        [props.previous, props.usePagedEntityResult],
    );
    /** The current page. */
    const page = useMemo(() => (props.page ? props.page : props.usePagedEntityResult ? props.usePagedEntityResult.page : null), [props.page, props.usePagedEntityResult]);
    /** The current maximum available pages. */
    const maxPages = useMemo(
        () => (props.maxPages ? props.maxPages : props.usePagedEntityResult ? props.usePagedEntityResult.maxPages : null),
        [props.maxPages, props.usePagedEntityResult],
    );

    return (
        <div className="absolute top-0 left-0 flex h-full w-full overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
                {!props.disableTableInteractionsBar && (
                    <TableInteractionBar onSearch={props.usePagedEntityResult ? props.usePagedEntityResult.updateSearchValue : props.onSearch} />
                )}
                <div className="sticky top-0 left-0 h-full w-full overflow-auto">
                    <table className="table w-full">
                        <thead className="sticky top-0 z-20">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header, i) => (
                                        <th
                                            key={header.id}
                                            style={{ width: header.getSize(), minWidth: header.getSize(), maxWidth: header.column.columnDef.maxSize }}
                                            className={`sticky top-0 bg-white p-0 dark:bg-base-100 ${
                                                i === 0 ? 'left-0 z-10' : i === 1 && props.identifierPropertyName && props.updateCheckedItems ? 'left-14 z-20' : ''
                                            }`}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={`min-h-[50px] py-0 px-4 ${header.column.getIsSorted() ? 'font-bold' : 'font-normal'} border-b border-t bg-base-100 ${
                                                        isDarkModeEnabled ? 'border-border-gray' : 'border-base-200'
                                                    } flex w-full flex-1 items-center justify-start ${header.column.getCanSort() ? 'cursor-pointer' : ''} min-w-max`}
                                                    onClick={() => {
                                                        if (!header.column.getCanSort()) {
                                                            return;
                                                        }
                                                        // Toggle the sort handler.
                                                        header.column.toggleSorting();
                                                    }}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    <div className="ml-2">
                                                        {{
                                                            asc: <ArrowSmallUpIcon className="h-4 w-4" />,
                                                            desc: <ArrowSmallDownIcon className="h-4 w-4" />,
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </div>
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    className={`${props.onRowClick ? 'hover cursor-pointer' : ''} ${
                                        lastClickedRowItem === row.original ? (isDarkModeEnabled ? 'text-secondary' : 'text-primary') : ''
                                    }`}
                                    key={row.id}
                                    onClick={() => {
                                        if (props.onRowClick) {
                                            setLastClickedRowItem(row.original);
                                            props.onRowClick(row.original);
                                        }
                                    }}
                                >
                                    {row.getVisibleCells().map((cell, i) => (
                                        <td
                                            style={{
                                                width: cell.column.columnDef.minSize,
                                                minWidth: cell.column.columnDef.minSize,
                                                maxWidth: cell.column.columnDef.maxSize,
                                            }}
                                            key={cell.id}
                                            className={`overflow-hidden text-ellipsis ${isDarkModeEnabled ? 'border-border-gray' : 'border-base-200'} ${
                                                i === 0 ? 'sticky left-0 z-10' : i === 1 && props.identifierPropertyName && props.updateCheckedItems ? 'sticky left-14 z-10' : ''
                                            }`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            {table.getFooterGroups().map((footerGroup) => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map((header) => (
                                        <th className="bg-base-100" key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    </table>
                </div>
                {nextPage && previousPage && page && maxPages && maxPages > 1 && <PaginationControls page={page} maxPages={maxPages} next={nextPage} previous={previousPage} />}
            </div>
        </div>
    );
};

export default Table;
