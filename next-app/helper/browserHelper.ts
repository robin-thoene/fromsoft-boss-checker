/**
 * Retrieve the browser language code.
 *
 * @returns {string} The browser language code.
 */
const getBrowserLanguageCode = (): string => {
    if (navigator) {
        return (navigator.languages && navigator.languages[0]) || navigator.language;
    }
    return 'en';
};

/**
 * Retrieve the short language key of the browser.
 *
 * @returns {string} The short language key.
 */
const getBrowserLanguageCodeShort = (): string => {
    return getBrowserLanguageCode().slice(0, 2);
};

/**
 * Determines whether the current browser is an Internet Explorer.
 *
 * @returns {boolean} Whether the current browser is IE or not.
 */
const isIE = (): boolean => {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ') > -1;
    const msie11 = ua.indexOf('Trident/') > -1;
    // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
    const isEdge = ua.indexOf('Edge/') > -1;
    return msie || msie11 || isEdge;
};

export { getBrowserLanguageCode, getBrowserLanguageCodeShort, isIE };
