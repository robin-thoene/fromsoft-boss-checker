import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/darkSouls3DataHelper';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'darkSouls3FelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'darkSouls3MarkedBossIds';

/**
 * "/dark-souls-3" route component.
 * @returns {ReactElement} The component to render on the route.
 */
export default function Page(): ReactElement {
    // Get the list of all Dark Souls 3 bosses.
    const darkSouls3Bosses = getBosses();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.DarkSouls3}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={darkSouls3Bosses}
            />
        </>
    );
}
