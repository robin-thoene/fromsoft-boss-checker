import { ReactElement } from 'react';

import { BossChecklist } from '@/components/organisms';
import { getDictionary } from '@/dictionaries';
import { FromSoftwareGame } from '@/enumerations';
import { getRegions } from '@/helper/eldenRingDataHelper';
import { IPageParams } from '@/types';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'eldenRingFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'markedBossIds';
// The key in the local storage to store the collapsed regions.
const localStorageCollapsedRegionsKey = 'eldenRingCollapsedRegions';

/**
 * "/elden-ring" route component.
 * @param {Promise<IPageParams>} params - The page parameters.
 * @returns {Promise<ReactElement>} The component to render on the route.
 */
export default async function Page({ params }: { params: Promise<IPageParams> }): Promise<ReactElement> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const eldenRingRegions = getRegions();

    return (
        <>
            <BossChecklist
                dic={dict}
                fromSoftwareGame={FromSoftwareGame.EldenRing}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                regions={eldenRingRegions}
                localStorageCollapsedRegionsKey={localStorageCollapsedRegionsKey}
            />
        </>
    );
}
