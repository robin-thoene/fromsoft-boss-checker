import { ReactElement } from 'react';

import { BossChecklistPage } from '@/components/pages';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/darkSouls2DataHelper';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'darkSouls2FelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'darkSouls2MarkedBossIds';

/**
 * "/dark-souls-2" route component.
 * @returns {ReactElement} The component to render on the route.
 */
export default function Page(): ReactElement {
    // Get the list of all Dark Souls 2 bosses.
    const darkSouls2Bosses = getBosses();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklistPage
                fromSoftwareGame={FromSoftwareGame.DarkSouls2}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={darkSouls2Bosses}
            />
        </>
    );
}
