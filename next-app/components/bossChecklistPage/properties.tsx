import { FromSoftwareGame } from '../../enumerations';
import { IBoss, IRegion } from '../../types';

/**
 * Properties for the boss checklist page component.
 */
interface IBossChecklistPageProps {
    /** The FromSoftware game to display. */
    fromSoftwareGame: FromSoftwareGame;
    /** The regions including the boss lists to display. */
    regions?: IRegion[];
    /** The boss list to display. */
    bosses?: IBoss[];
    /** The key to use for retrieving / saving the ID's of the bosses marked as felled. */
    localStorageFelledBossesKey: string;
    /** The key to use for retrieving / saving the ID's of the bosses marked by the user. */
    localStorageMarkedBossesKey: string;
}

export type { IBossChecklistPageProps };
