import type { NextApiRequest, NextApiResponse } from 'next';

import regionsJson from '@/data/eldenRingRegions.json';
import { IEldenRingBoss, IRegion } from '@/types';

// Load the list of all Elden Ring bosses once.
const regions: IRegion[] = regionsJson as IRegion[];
const bosses: IEldenRingBoss[] = [];
regions.forEach((r) => bosses.push(...(r.bosses as IEldenRingBoss[])));

/**
 * The health endpoint.
 * @param {NextApiRequest} req The incoming request object.
 * @param {NextApiResponse} res The outgoing response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Start the async check of the location for each elden ring boss.
    const locationCheckPromises: Promise<string | null>[] = [];
    bosses.forEach((boss) => locationCheckPromises.push(checkEldenRingBossLocation(boss)));
    // Wait for all checks to complete.
    const locationCheckResults = await Promise.all(locationCheckPromises);
    // Filter to retrieve only the invalid locations.
    const invalidBossLocations = locationCheckResults.filter((r) => r !== null);
    if (invalidBossLocations.length > 0) {
        // If there are invalid locations, return a 500 error with the list of invalid locations.
        res.status(500).json(invalidBossLocations);
        return;
    }
    // If all checks passed, return a 200 response, that indicates that the service is healthy.
    res.status(200).json({ message: 'healthy' });
}

/**
 * Checks if the location of the given Elden Ring boss is valid.
 * @param {IEldenRingBoss} boss The Elden Ring boss to check.
 * @returns {string | null} The invalid location, or null if the location is valid.
 */
const checkEldenRingBossLocation = async (boss: IEldenRingBoss): Promise<string | null> => {
    const checkResponse = await fetch(boss.wikiMapReference, {
        method: 'HEAD',
    });
    if (checkResponse.status !== 200) {
        return boss.wikiMapReference;
    }
    return null;
};
