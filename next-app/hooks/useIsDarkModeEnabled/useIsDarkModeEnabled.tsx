import { useEffect, useState } from 'react';

/**
 * Determines whether the dark mode is currently enabled or not.
 *
 * @returns {boolean} True if the dark mode is enabled, false if not.
 */
const useIsDarkModeEnabled = (): boolean => {
    /** State to keep track whether the dark mode is enabled or not. */
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(false);

    /** Register listener. */
    useEffect(() => {
        // Get the reference to the html element..
        const htmlElement = document.documentElement;
        // Define logic to determine if the dark mode is enabled or not.
        const checkIfDarkModeIsEnabled = () => {
            if (htmlElement.hasAttribute('data-theme')) {
                const theme = htmlElement.getAttribute('data-theme');
                setIsDarkModeEnabled(theme === 'dark');
                return;
            }
            setIsDarkModeEnabled(window.matchMedia('(prefers-color-scheme: dark)').matches);
        };
        // Register event listener to update on changes on the html element.
        htmlElement.addEventListener('input', checkIfDarkModeIsEnabled);
        // Determine once at startup if dark mode is enabled or not.
        checkIfDarkModeIsEnabled();
        // Remove event listener on unmount,
        return () => htmlElement.removeEventListener('input', checkIfDarkModeIsEnabled);
    }, []);

    return isDarkModeEnabled;
};
export default useIsDarkModeEnabled;
