import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/bloodborneDataHelper';
import useCanonicalGameUrl from '../hooks/useCanonicalGameUrl';
import { INextPageProps } from '../types';

// Get the list of all Bloodborne bosses.
const bloodborneBosses = getBosses();

/**
 * The page component to render at "/bloodborne".
 *
 * @param {INextPageProps} props The page props.
 * @returns {NextPage} The Bloodborne page component.
 */
const Bloodborne: NextPage<INextPageProps> = (props) => {
    /** Get the canonical url for this page. */
    const canonicalUrl = useCanonicalGameUrl(FromSoftwareGame.Bloodborne, props.hostUrl);

    return (
        <>
            {canonicalUrl && (
                <Head>
                    <link rel="canonical" href={canonicalUrl} key="canonical" />
                </Head>
            )}
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.Bloodborne}
                localStorageFelledBossesKey="bloodborneFelledBossIds"
                localStorageMarkedBossesKey="bloodborneMarkedBossIds"
                bosses={bloodborneBosses}
            />
        </>
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    let hostUrl = process.env.VERCEL_URL;
    if (hostUrl && !hostUrl.includes('://')) {
        hostUrl = `https://${hostUrl}`;
    }
    return {
        props: {
            hostUrl: hostUrl ?? null,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Bloodborne;
