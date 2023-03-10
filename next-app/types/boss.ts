/**
 * Represents a general boss.
 */
interface IBoss {
    /** The unique identifier of the boss. */
    id: number;
    /** The name of the boss. */
    name: string;
    /** The link to the external wiki page of the boss. */
    wikiReference: string;
}

export type { IBoss };
