import { IBoss } from '@/types';

import bossesJson from '../../public/data/darkSouls2Bosses.json';

/**
 * Retrieve all available bosses in Dark Souls 2.
 * @returns {IBoss[]} The list of bosses in Dark Souls 2.
 */
const getBosses = (): IBoss[] => {
    const bosses: IBoss[] = bossesJson as IBoss[];
    return bosses;
};

export { getBosses };
