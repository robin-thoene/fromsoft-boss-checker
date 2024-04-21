import { IBoss } from './boss';

/**
 * Represents a general region.
 */
interface IRegion {
    /** The unique identifier of the region. */
    id: number;
    /** The name of the region. */
    name: string;
    /** The list of bosses in the region. */
    bosses: IBoss[];
}

export type { IRegion };
