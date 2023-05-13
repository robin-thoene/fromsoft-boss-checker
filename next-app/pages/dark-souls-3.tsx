import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/darkSouls3DataHelper';

// Get the list of all Dark Souls bosses.
const darkSouls3Bosses = getBosses();

/**
 * The page component to render at "/dark-souls-3".
 *
 * @returns {NextPage} The Dark Souls 3 page component.
 */
const DarkSouls3: NextPage = () => {
    return (
        <BossChecklistPage
            fromSoftwareGame={FromSoftwareGame.DarkSouls3}
            localStorageFelledBossesKey="darkSoulsFelledBossIds"
            localStorageMarkedBossesKey="darkSoulsMarkedBossIds"
            bosses={darkSouls3Bosses}
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

export default DarkSouls3;
