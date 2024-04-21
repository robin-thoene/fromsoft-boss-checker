import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/bloodborneDataHelper';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'bloodborneFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'bloodborneMarkedBossIds';

/**
 * "/bloodborne" route component.
 * @returns {ReactElement} The component to render on the route.
 */
export default function Page(): ReactElement {
    // Get the list of all Bloodborne bosses.
    const bloodborneBosses = getBosses();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.Bloodborne}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={bloodborneBosses}
            />
        </>
    );
}
