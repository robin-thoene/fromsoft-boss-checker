import bossesJson from "@/data/bloodborneBosses.json";
import { IBoss } from "@/types";

/**
 * Retrieve all available bosses in Bloodborne.
 * @returns {IBoss[]} The list of bosses in Bloodborne.
 */
const getBosses = (): IBoss[] => {
  const bosses: IBoss[] = bossesJson as IBoss[];
  return bosses.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export { getBosses };
