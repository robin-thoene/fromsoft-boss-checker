import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';

/**
 * The page component to render at "/dark-souls-1".
 *
 * @returns {NextPage} The Dark Souls page component.
 */
const DarkSouls: NextPage = () => {
    return (
        <BossChecklistPage
            fromSoftwareGame={FromSoftwareGame.DarkSouls}
            localStorageFelledBossesKey="darkSoulsFelledBossIds"
            localStorageMarkedBossesKey="darkSoulsMarkedBossIds"
            regions={[]}
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
