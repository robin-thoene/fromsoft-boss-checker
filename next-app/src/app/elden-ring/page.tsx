import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getRegions } from '@/helper/eldenRingDataHelper';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'eldenRingFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'markedBossIds';

/**
 * "/elden-ring" route component.
 * @returns {ReactElement} The component to render on the route.
 */
export default function Page(): ReactElement {
    // Get all Elden Ring regions with the boss lists.
    const eldenRingRegions = getRegions();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.EldenRing}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                regions={eldenRingRegions}
            />
        </>
    );
}
