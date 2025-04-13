import bossesJson from "@/data/sekiroBosses.json";
import { IBoss } from "@/types";

/**
 * Retrieve all available bosses in Sekiro.
 * @returns {IBoss[]} The list of bosses in Sekiro.
 */
const getBosses = (): IBoss[] => {
  const bosses: IBoss[] = bossesJson as IBoss[];
  return bosses.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export { getBosses };
