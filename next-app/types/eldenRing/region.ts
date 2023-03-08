import { IBoss } from './boss';

/**
 * Represents a region in Elden Ring.
 */
interface IRegion {
    /** The unique identifier of the region. */
    id: number;
    /** The name of the region. */
    name: string;
    /** The list of bosses to fell in the region. */
    bosses: IBoss[];
}

export type { IRegion };
