import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getRegions } from '../helper/eldenRingDataHelper';
import useCanonicalGameUrl from '../hooks/useCanonicalGameUrl';
import { INextPageProps } from '../types';

// Get all Elden Ring regions with the boss lists.
const eldenRingRegions = getRegions();
// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'eldenRingFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'markedBossIds';

/**
 * The page component to render at "/elden-ring".
 *
 * @param {INextPageProps} props The page props.
 * @returns {NextPage} The Elden Ring page component.
 */
const EldenRing: NextPage<INextPageProps> = (props) => {
    /** Get the canonical url for this page. */
    const canonicalUrl = useCanonicalGameUrl(FromSoftwareGame.EldenRing, props.hostUrl);

    return (
        <>
            {canonicalUrl && (
                <Head>
                    <link rel="canonical" href={canonicalUrl} key="canonical" />
                </Head>
            )}
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.EldenRing}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                regions={eldenRingRegions}
            />
        </>
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    const hostUrl = process.env.VERCEL_URL;
    return {
        props: {
            hostUrl: hostUrl ?? null,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default EldenRing;
