import React, { FunctionComponent, ReactElement } from 'react';

import { useStoreActions } from '../../../../store/store';
import DarkModeToggle from '../../darkModeToggle';
import SearchBar from '../../inputs/searchBar';
import LanguageSelector from '../../languageSelector';
import { INavigationTopProps } from './properties';

/**
 * Basic top navigation to display the logo.
 *
 * @param {INavigationTopProps} props The component properties.
 * @returns {ReactElement} The top navigation component.
 */
const NavigationTop: FunctionComponent<INavigationTopProps> = (props): ReactElement => {
    /** Action to update the global search value. */
    const updateGlobalSearchValue = useStoreActions((actions) => actions.ApplicationModel.updateGlobalSearchValue);

    return (
        <div className="navbar min-h-max border-b border-base-200 bg-base-100 p-3 shadow-sm">
            <div className="grid w-full grid-cols-2">
                <div>{props.enableGlobalSearch && <SearchBar onSearch={(newValue) => updateGlobalSearchValue(newValue)} canBeCleared />}</div>
                <div className="flex items-center justify-end">
                    <DarkModeToggle />
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
};

export default NavigationTop;
