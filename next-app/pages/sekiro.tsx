import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import BossChecklistPage from '../components/bossChecklistPage';
import { FromSoftwareGame } from '../enumerations';
import { getBosses } from '../helper/sekiroDataHelper';

// Get the list of all Sekiro bosses.
const sekiroBosses = getBosses();

/**
 * The page component to render at "/sekiro".
 *
 * @returns {NextPage} The Sekiro page component.
 */
const Sekiro: NextPage = () => {
    return (
        <BossChecklistPage
            fromSoftwareGame={FromSoftwareGame.Sekiro}
            localStorageFelledBossesKey="sekiroFelledBossIds"
            localStorageMarkedBossesKey="sekiroMarkedBossIds"
            bosses={sekiroBosses}
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

export default Sekiro;
