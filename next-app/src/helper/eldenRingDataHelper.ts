import regionsJson from "@/data/eldenRingRegions.json";
import { IRegion } from "@/types";

/**
 * Retrieve all available regions in Elden Ring, with the list of region bosses included.
 * @returns {IRegion[]} The list of regions in Elden Ring.
 */
const getRegions = (): IRegion[] => {
  const regions: IRegion[] = regionsJson as IRegion[];
  regions.forEach((r) => r.bosses.sort((a, b) => (a.name > b.name ? 1 : -1)));
  return regions;
};

export { getRegions };
