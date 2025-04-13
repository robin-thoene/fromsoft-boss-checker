import bossesJson from "@/data/darkSouls3Bosses.json";
import { IBoss } from "@/types";

/**
 * Retrieve all available bosses in Dark Souls 3.
 * @returns {IBoss[]} The list of bosses in Dark Souls 3.
 */
const getBosses = (): IBoss[] => {
  const bosses: IBoss[] = bossesJson as IBoss[];
  return bosses.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export { getBosses };
