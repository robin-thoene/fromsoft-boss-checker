import { ReactElement } from 'react';

import { BossChecklist } from '@/components/organisms';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/darkSouls3DataHelper';
import { IPageParams } from '@/types';

import { getDictionary } from '../dictionaries';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'darkSouls3FelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'darkSouls3MarkedBossIds';

/**
 * "/dark-souls-3" route component.
 * @param {IPageParams} params - The page parameters.
 * @returns {Promise<ReactElement>} The component to render on the route.
 */
export default async function Page({ params }: { params: IPageParams }): Promise<ReactElement> {
    // Get the translations dictionary for the requested language.
    const dict = await getDictionary(params.lang);
    // Get the list of all Dark Souls 3 bosses.
    const darkSouls3Bosses = getBosses();

    // TODO: Figure out how to set the canonical URL in the head.
    return (
        <>
            <BossChecklist
                dic={dict}
                fromSoftwareGame={FromSoftwareGame.DarkSouls3}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={darkSouls3Bosses}
            />
        </>
    );
}
