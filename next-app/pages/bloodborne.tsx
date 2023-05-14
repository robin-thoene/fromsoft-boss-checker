import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/bloodborneDataHelper';

// Get the list of all Bloodborne bosses.
const bloodborneBosses = getBosses();

/**
 * The page component to render at "/bloodborne".
 *
 * @returns {NextPage} The Bloodborne page component.
 */
const DarkSouls: NextPage = () => {
    return (
        <BossChecklistPage
            fromSoftwareGame={FromSoftwareGame.Bloodborne}
            localStorageFelledBossesKey="bloodborneFelledBossIds"
            localStorageMarkedBossesKey="bloodborneMarkedBossIds"
            bosses={bloodborneBosses}
        />
    );
};

/**
 * Server side executed method to inject properties into the component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default DarkSouls;
