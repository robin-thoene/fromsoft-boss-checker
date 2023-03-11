import bossesJson from '../public/data/darkSoulsBosses.json';
import { IBoss } from '../types';

/**
 * Retrieve all available bosses in Dark Souls.
 *
 * @returns {IBoss[]} The list of bosses in Dark Souls.
 */
const getBosses = (): IBoss[] => {
    const bosses: IBoss[] = bossesJson as IBoss[];
    return bosses;
};

export { getBosses };
