import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/sekiroDataHelper';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'sekiroFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'sekiroMarkedBossIds';

/**
 * "/sekiro" route component.
 * @returns {ReactElement} The component to render on the route.
 */
export default function Page(): ReactElement {
    // Get the list of all Sekiro bosses.
    const sekiroBosses = getBosses();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.Sekiro}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={sekiroBosses}
            />
        </>
    );
}
