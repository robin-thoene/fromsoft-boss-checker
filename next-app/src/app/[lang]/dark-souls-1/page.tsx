import { ReactElement } from 'react';

import { BossChecklist } from '@/components/organisms';
import { getDictionary } from '@/dictionaries';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/darkSoulsDataHelper';
import { IPageParams } from '@/types';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'darkSoulsFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'darkSoulsMarkedBossIds';

/**
 * "/dark-souls-1" route component.
 * @param {IPageParams} params - The page parameters.
 * @returns {Promise<ReactElement>} The component to render on the route.
 */
export default async function Page({ params }: { params: IPageParams }): Promise<ReactElement> {
    // Get the translations dictionary for the requested language.
    const dict = await getDictionary(params.lang);
    // Get the list of all Dark Souls bosses.
    const darkSoulsBosses = getBosses();

    return (
        <>
            <BossChecklist
                dic={dict}
                fromSoftwareGame={FromSoftwareGame.DarkSouls}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={darkSoulsBosses}
            />
        </>
    );
}
