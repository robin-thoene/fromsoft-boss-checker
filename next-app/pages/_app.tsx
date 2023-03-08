import '../styles/globals.css';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from 'easy-peasy';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

import BasicLayout from '../components/base/layout/basicLayout';
import MsalEventHandler from '../components/base/msalEventHandler';
import { getClientConfig } from '../helper/configHelper';
import { buildMsalConfig } from '../helper/msalHelper';
import { Store } from '../store/store';

// Export the msal instance.
export let msalInstance: PublicClientApplication;
// Create query client to use.
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

/**
 * Part of the custom HTML Head
 *
 * @returns {ReactElement} Part of the application Head
 */
const CustomHead: FunctionComponent = (): ReactElement => {
    return (
        <Head>
            <title>fromsoft-boss-checker</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
    );
};
/**
 * The main entry point of the next js application.
 *
 * @param {AppProps} param0 The properties of the app component.
 * @returns {ReactElement} The application component.
 */
const App: FunctionComponent<AppProps> = ({ Component, pageProps }: AppProps): ReactElement => {
    /** Msal instance state. */
    const [msalInstanceState, setMsalInstanceState] = useState<PublicClientApplication>();

    /** Initialize the application. */
    useEffect(() => {
        const configuration = getClientConfig();
        if ((configuration.azureAdOptions && configuration.azureAdOptions.clientId) || (configuration.azureAdB2COptions && configuration.azureAdB2COptions.clientId)) {
            // Build the msal config using the fetched configuration values.
            const msalConfig = buildMsalConfig(configuration, false);
            // Create the msal instance.
            msalInstance = new PublicClientApplication(msalConfig);
            // Set the msal instance to use in the provider.
            setMsalInstanceState(msalInstance);
        }
    }, []);

    return msalInstanceState ? (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <StoreProvider store={Store}>
                <MsalProvider instance={msalInstanceState}>
                    <MsalEventHandler>
                        <CustomHead />
                        <BasicLayout>
                            <Component {...pageProps} />
                        </BasicLayout>
                    </MsalEventHandler>
                </MsalProvider>
            </StoreProvider>
        </QueryClientProvider>
    ) : (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <StoreProvider store={Store}>
                <CustomHead />
                <BasicLayout>
                    <Component {...pageProps} />
                </BasicLayout>
            </StoreProvider>
        </QueryClientProvider>
    );
};

export default appWithTranslation(App);
