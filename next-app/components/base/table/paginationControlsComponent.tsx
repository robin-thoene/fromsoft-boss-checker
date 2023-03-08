import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React, { FunctionComponent, ReactElement } from 'react';

import IconButton from '../button/iconButton';
import Label from '../label';
import { IPaginationControlsProps } from './paginationControlsProperties';

/**
 * Controls to handle paging.
 *
 * @param {IPaginationControlsProps} props The component properties.
 * @returns {ReactElement} The pagination controls component.
 */
const PaginationControls: FunctionComponent<IPaginationControlsProps> = (props): ReactElement => {
    return (
        <div className="mt-4 flex flex-row justify-end">
            <IconButton icon={<ChevronLeftIcon className="h-5 w-5" />} disabled={props.page <= 1} onClick={props.previous} />
            <div className="mx-2 flex items-center justify-center">
                <Label text={`${props.page} / ${props.maxPages}`} />
            </div>
            <IconButton icon={<ChevronRightIcon className="h-5 w-5" />} disabled={props.page >= props.maxPages} onClick={props.next} />
        </div>
    );
};

export default PaginationControls;
