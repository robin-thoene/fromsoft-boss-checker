import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from 'easy-peasy';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

import BasicLayout from '../components/base/layout/basicLayout';
import { Store } from '../store/store';

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
            <meta name="google-site-verification" content="uWK-VE6nIdpaczu7yT42lov06BE-ninN8llNZOwLeck" />
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
    return (
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
