import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/darkSouls2DataHelper';
import useCanonicalGameUrl from '../hooks/useCanonicalGameUrl';
import { INextPageProps } from '../types';

// Get the list of all Dark Souls 2 bosses.
const darkSouls2Bosses = getBosses();

/**
 * The page component to render at "/dark-souls-2".
 *
 * @param {INextPageProps} props The page props.
 * @returns {NextPage} The Dark Souls 2 page component.
 */
const DarkSouls2: NextPage<INextPageProps> = (props) => {
    /** Get the canonical url for this page. */
    const canonicalUrl = useCanonicalGameUrl(FromSoftwareGame.DarkSouls2, props.hostUrl);

    return (
        <>
            {canonicalUrl && (
                <Head>
                    <link rel="canonical" href={canonicalUrl} key="canonical" />
                </Head>
            )}

            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.DarkSouls2}
                localStorageFelledBossesKey="darkSouls2FelledBossIds"
                localStorageMarkedBossesKey="darkSouls2MarkedBossIds"
                bosses={darkSouls2Bosses}
            />
        </>
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    const hostUrl = process.env.HOST_URL;
    
    return {
        props: {
            hostUrl: hostUrl ?? null,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default DarkSouls2;
