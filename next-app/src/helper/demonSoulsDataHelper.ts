import bossesJson from "@/data/demonSouls.json";
import { IBoss } from "@/types";

/**
 * Retrieve all available bosses in Demon Souls.
 * @returns {IBoss[]} The list of bosses in Demon Souls.
 */
const getBosses = (): IBoss[] => {
  const bosses: IBoss[] = bossesJson as IBoss[];
  return bosses.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export { getBosses };
