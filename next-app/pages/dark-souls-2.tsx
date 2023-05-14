import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/darkSouls2DataHelper';

// Get the list of all Dark Souls 2 bosses.
const darkSouls2Bosses = getBosses();

/**
 * The page component to render at "/dark-souls-2".
 *
 * @returns {NextPage} The Dark Souls 2 page component.
 */
const DarkSouls2: NextPage = () => {
    return (
        <BossChecklistPage
            fromSoftwareGame={FromSoftwareGame.DarkSouls2}
            localStorageFelledBossesKey="darkSouls2FelledBossIds"
            localStorageMarkedBossesKey="darkSouls2MarkedBossIds"
            bosses={darkSouls2Bosses}
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

export default DarkSouls2;