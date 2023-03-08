import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

/**
 * Framework file by NextJS https://nextjs.org/docs/advanced-features/custom-document
 *
 * @returns {Element} Document outline
 */
export default function Document(): JSX.Element {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content="Checklist for bosses of popular FromSoftware games." />
                <meta property="og:title" content="fromsoft-boss-checker" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
