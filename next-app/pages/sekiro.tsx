import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/sekiroDataHelper';
import useCanonicalGameUrl from '../hooks/useCanonicalGameUrl';
import { INextPageProps } from '../types';

// Get the list of all Sekiro bosses.
const sekiroBosses = getBosses();

/**
 * The page component to render at "/sekiro".
 *
 * @param {INextPageProps} props The page props.
 * @returns {NextPage} The Sekiro page component.
 */
const Sekiro: NextPage<INextPageProps> = (props) => {
    /** Get the canonical url for this page. */
    const canonicalUrl = useCanonicalGameUrl(FromSoftwareGame.Sekiro, props.hostUrl);

    return (
        <>
            {canonicalUrl && (
                <Head>
                    <link rel="canonical" href={canonicalUrl} key="canonical" />
                </Head>
            )}
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.Sekiro}
                localStorageFelledBossesKey="sekiroFelledBossIds"
                localStorageMarkedBossesKey="sekiroMarkedBossIds"
                bosses={sekiroBosses}
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

export default Sekiro;
