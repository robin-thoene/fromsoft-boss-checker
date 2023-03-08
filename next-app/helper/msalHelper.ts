import { Configuration } from '@azure/msal-browser';

import { IConfiguration } from '../types';
import { isIE } from './browserHelper';

/**
 * Build the required msal config.
 *
 * @param {IConfiguration} config The frontend config object.
 * @param {boolean} isB2C Whether the msal config shall be returned as b2c config or not.
 * @returns {Configuration} MSAL configuration.
 */
const buildMsalConfig = (config: IConfiguration, isB2C: boolean): Configuration => {
    let msalConfig: Configuration;
    if (isB2C) {
        // Build msal config for b2c flows.
        msalConfig = {
            auth: {
                clientId: config.azureAdB2COptions.clientId,
                authority: `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.signUpAndSignInFlow}`,
                redirectUri: `${window.location.origin}${config.azureAdB2COptions.callbackPath}`,
                navigateToLoginRequestUrl: true,
                postLogoutRedirectUri: window.location.origin,
                knownAuthorities: [
                    `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.signUpAndSignInFlow}`,
                    `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.signUpFlow}`,
                ],
            },
            cache: {
                cacheLocation: 'sessionStorage',
                storeAuthStateInCookie: isIE(),
            },
        };
    } else {
        // Build msal config for aad.
        msalConfig = {
            auth: {
                clientId: config.azureAdOptions.clientId,
                authority: `${config.azureAdOptions.instance}/${config.azureAdOptions.tenantId}`,
                redirectUri: `${window.location.origin}${config.azureAdOptions.callbackPath}`,
                navigateToLoginRequestUrl: true,
                knownAuthorities: [`${config.azureAdOptions.instance}/${config.azureAdOptions.tenantId}`],
            },
            cache: {
                cacheLocation: 'sessionStorage',
                storeAuthStateInCookie: isIE(),
            },
        };
    }
    // Return the config.
    return msalConfig;
};

export { buildMsalConfig };
