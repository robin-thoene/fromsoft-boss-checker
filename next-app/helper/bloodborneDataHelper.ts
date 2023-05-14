import bossesJson from '../public/data/bloodborneBosses.json';
import { IBoss } from '../types';

/**
 * Retrieve all available bosses in Bloodborne.
 *
 * @returns {IBoss[]} The list of bosses in Bloodborne.
 */
const getBosses = (): IBoss[] => {
    const bosses: IBoss[] = bossesJson as IBoss[];
    return bosses;
};

export { getBosses };
