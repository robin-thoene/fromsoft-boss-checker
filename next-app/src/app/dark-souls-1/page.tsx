import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/darkSoulsDataHelper';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'darkSoulsFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'darkSoulsMarkedBossIds';

/**
 * "/dark-souls-1" route component.
 * @returns {ReactElement} The component to render on the route.
 */
export default function Page(): ReactElement {
    // Get the list of all Dark Souls bosses.
    const darkSoulsBosses = getBosses();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.DarkSouls}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={darkSoulsBosses}
            />
        </>
    );
}
