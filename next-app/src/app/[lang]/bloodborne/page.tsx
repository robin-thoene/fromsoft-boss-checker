import { ReactElement } from 'react';

import { BossChecklist } from '@/components/organisms';
import { getDictionary } from '@/dictionaries';
import { FromSoftwareGame } from '@/enumerations';
import { getBosses } from '@/helper/bloodborneDataHelper';
import { IPageParams } from '@/types';

// The key in the local storage to store the users progress.
const localStorageFelledBossesKey = 'bloodborneFelledBossIds';
// The key in the local storage to store the marked bosses.
const localStorageMarkedBossesKey = 'bloodborneMarkedBossIds';

/**
 * "/bloodborne" route component.
 * @param {Promise<IPageParams>} params - The page parameters.
 * @returns {Promise<ReactElement>} The component to render on the route.
 */
export default async function Page({ params }: { params: Promise<IPageParams> }): Promise<ReactElement> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const bloodborneBosses = getBosses();

    return (
        <>
            <BossChecklist
                dic={dict}
                fromSoftwareGame={FromSoftwareGame.Bloodborne}
                localStorageFelledBossesKey={localStorageFelledBossesKey}
                localStorageMarkedBossesKey={localStorageMarkedBossesKey}
                bosses={bloodborneBosses}
            />
        </>
    );
}
