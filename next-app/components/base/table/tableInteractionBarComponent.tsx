import React, { FunctionComponent, ReactElement } from 'react';

import SearchBar from '../inputs/searchBar';
import { ITableInteractionBarProps } from './tableInteractionBarProperties';

/**
 * General interaction options regarding a table.
 *
 * @param {ITableInteractionBarProps} props The component properties.
 * @returns {ReactElement} The table interaction bar component.
 */
const TableInteractionBar: FunctionComponent<ITableInteractionBarProps> = (props): ReactElement => {
    return (
        <div className="flex justify-end py-6 px-3">
            {props.onSearch && (
                <div className="w-96">
                    <SearchBar canBeCleared onSearch={props.onSearch} />
                </div>
            )}
        </div>
    );
};

export default TableInteractionBar;
