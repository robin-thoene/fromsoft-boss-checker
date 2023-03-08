import { Configuration, EventType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import React, { FunctionComponent, ReactElement, ReactNode, useEffect } from 'react';

import { isIE } from '../../../helper/browserHelper';
import { getClientConfig } from '../../../helper/configHelper';

export interface IMsalEventHandlerProps {
    /** The children to render. */
    children: ReactNode;
}

/**
 * The event handler component for the msal instance.
 *
 * @param {IMsalEventHandlerProps} props The children to render.
 * @returns {ReactElement} The msal event handler component.
 */
const MsalEventHandler: FunctionComponent<IMsalEventHandlerProps> = (props): ReactElement => {
    /** Access to the msal instance. */
    const { instance } = useMsal();

    /** register event callback to the msal instance. */
    useEffect(() => {
        // This will be run on component mount
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const callbackId = instance.addEventCallback(async (message: any) => {
            // This will be run every time an event is emitted after registering this callback
            if (message.eventType === EventType.LOGIN_FAILURE) {
                // The login failed, check the error.
                const error = message.error;
                if (error && error.toString().includes('AADB2C90118')) {
                    // This is a known B2C error. The user pressed password forget in the login.
                    // Build the msal configuration object to access the password reset flow.
                    const config = getClientConfig();
                    const msalSingUpConfig: Configuration = {
                        auth: {
                            clientId: config.azureAdB2COptions.clientId,
                            authority: `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.passwordResetFlow}`,
                            redirectUri: `${window.location.origin}${config.azureAdB2COptions.callbackPath}`,
                            navigateToLoginRequestUrl: true,
                            postLogoutRedirectUri: window.location.origin,
                            knownAuthorities: [
                                `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.signUpAndSignInFlow}`,
                                `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.signUpFlow}`,
                                `${config.azureAdB2COptions.instance}/tfp/${config.azureAdB2COptions.domain}/${config.azureAdB2COptions.passwordResetFlow}`,
                            ],
                        },
                        cache: {
                            cacheLocation: 'sessionStorage',
                            storeAuthStateInCookie: isIE(),
                        },
                    };
                    // Create a temp public client application using the new msal instance.
                    const tempMsalInstance = new PublicClientApplication(msalSingUpConfig);
                    // Redirect the user to the password reset flow.
                    await tempMsalInstance.loginRedirect();
                }
            }
        });

        return () => {
            // This will be run on component unmount
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
    }, [instance]);
    return <>{props.children}</>;
};

export default MsalEventHandler;
