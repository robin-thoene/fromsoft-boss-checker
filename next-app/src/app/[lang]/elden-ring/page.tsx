import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getRegions } from '@/helper/eldenRingDataHelper';
import { IPageParams } from '@/types';

import { getDictionary } from '../dictionaries';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'eldenRingFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'markedBossIds';

/**
 * "/elden-ring" route component.
 * @param {IPageParams} params - The page parameters.
 * @returns {Promise<ReactElement>} The component to render on the route.
 */
export default async function Page({ params }: { params: IPageParams }): Promise<ReactElement> {
    // Get the translations dictionary for the requested language.
    const dict = await getDictionary(params.lang);
    // Get all Elden Ring regions with the boss lists.
    const eldenRingRegions = getRegions();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                dic={dict}
                fromSoftwareGame={FromSoftwareGame.EldenRing}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                regions={eldenRingRegions}
            />
        </>
    );
}