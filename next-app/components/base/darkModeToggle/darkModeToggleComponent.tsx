import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

import useIsDarkModeEnabled from '../../../hooks/useIsDarkModeEnabled';

/**
 * Component to activate / de-activate the dark mode using a UI toggle.
 *
 * @returns {ReactElement} The dark mode toggle component.
 */
const DarkModeToggle: FunctionComponent = (): ReactElement => {
    /** Access to translations. */
    const { t } = useTranslation();
    /** Whether the dark mode is enabled or not. */
    const isDarkModeEnabled = useIsDarkModeEnabled();

    /**
     * Handle switch between light and dark theme.
     *
     * @param {boolean} enableDarkMode Whether the dark mode shall be enabled or not.
     */
    const handleThemeSwitch = (enableDarkMode: boolean) => {
        const htmlElement = document.documentElement;
        if (enableDarkMode) {
            // Activate the dark theme.
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            // Activate the light theme.
            htmlElement.setAttribute('data-theme', 'light');
        }
    };

    return (
        <label className="swap btn-ghost swap-rotate btn h-12 w-12 animate-none">
            <input
                aria-label={t('darkModeToggleAriaLabel') ?? undefined}
                type="checkbox"
                checked={isDarkModeEnabled}
                onChange={(event) => {
                    const checked = event.target.checked;
                    handleThemeSwitch(checked);
                }}
            />
            <SunIcon className="swap-off h-5 w-5 fill-secondary" />
            <MoonIcon className="current swap-on h-5 w-5 fill-secondary" />
        </label>
    );
};

export default DarkModeToggle;
