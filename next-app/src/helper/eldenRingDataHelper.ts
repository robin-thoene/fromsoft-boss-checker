import { IRegion } from '@/types';

import regionsJson from '../../public/data/eldenRingRegions.json';

/**
 * Retrieve all available regions in Elden Ring, with the list of region bosses included.
 * @returns {IRegion[]} The list of regions in Elden Ring.
 */
const getRegions = (): IRegion[] => {
    const regions: IRegion[] = regionsJson as IRegion[];
    return regions;
};

export { getRegions };
