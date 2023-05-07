import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement, useState } from 'react';

import Label from '../../label';
import { ISearchBarProps } from './properties';

/**
 * Input field to insert a search value and trigger a search action.
 *
 * @param {ISearchBarProps} props The component properties.
 * @returns {ReactElement} The search bar component.
 */
const SearchBar: FunctionComponent<ISearchBarProps> = (props): ReactElement => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** The current search value. */
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div className="form-control w-full max-w-full">
            {props.label && props.label !== '' && <Label text={props.label} />}
            <div className="relative w-full max-w-full">
                <div className="input-group max-w-full">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="input-bordered input w-full"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && props.onSearch(searchValue)}
                    />
                    <button aria-label={t('submitSearchAriaLabel') ?? undefined} className="btn-secondary btn-square btn" onClick={() => props.onSearch(searchValue)}>
                        <MagnifyingGlassIcon className="h-5 w-5 fill-white" />
                    </button>
                </div>
                {props.canBeCleared && searchValue !== '' && (
                    <div className="absolute right-14 top-1/2 z-10 -translate-y-1/2">
                        <button
                            aria-label={t('clearSearchAriaLabel') ?? undefined}
                            className="btn-ghost btn-circle btn h-7 min-h-0 w-7"
                            onClick={() => {
                                setSearchValue('');
                                props.onSearch('');
                            }}
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
