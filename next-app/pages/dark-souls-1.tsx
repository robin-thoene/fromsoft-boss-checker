import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/darkSoulsDataHelper';
import useCanonicalGameUrl from '../hooks/useCanonicalGameUrl';
import { INextPageProps } from '../types';

// Get the list of all Dark Souls bosses.
const darkSoulsBosses = getBosses();

/**
 * The page component to render at "/dark-souls-1".
 * @param {INextPageProps} props The page props.
 * @returns {NextPage} The Dark Souls page component.
 */
const DarkSouls: NextPage<INextPageProps> = (props) => {
    /** Get the canonical url for this page. */
    const canonicalUrl = useCanonicalGameUrl(FromSoftwareGame.DarkSouls, props.hostUrl);

    return (
        <>
            {canonicalUrl && (
                <Head>
                    <link rel="canonical" href={canonicalUrl} key="canonical" />
                </Head>
            )}
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.DarkSouls}
                localStorageFelledBossesKey="darkSoulsFelledBossIds"
                localStorageMarkedBossesKey="darkSoulsMarkedBossIds"
                bosses={darkSoulsBosses}
            />
        </>
    );
};

/**
 * Server side executed method to inject properties into the component.
 * @returns {object} The props to give to the page.
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

export default DarkSouls;
