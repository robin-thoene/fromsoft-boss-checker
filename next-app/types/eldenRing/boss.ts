import { IBoss } from '../boss';

/**
 * Represents a boss in Elden Ring.
 */
interface IEldenRingBoss extends IBoss {
    /** The link to the map location of the boss inside the external wiki. */
    wikiMapReference: string;
}

export type { IEldenRingBoss };
