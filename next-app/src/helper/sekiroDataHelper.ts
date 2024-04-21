import { IBoss } from '@/types';

import bossesJson from '../../public/data/sekiroBosses.json';

/**
 * Retrieve all available bosses in Sekiro.
 * @returns {IBoss[]} The list of bosses in Sekiro.
 */
const getBosses = (): IBoss[] => {
    const bosses: IBoss[] = bossesJson as IBoss[];
    return bosses;
};

export { getBosses };
