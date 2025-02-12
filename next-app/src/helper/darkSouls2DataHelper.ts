import bossesJson from "@/data/darkSouls2Bosses.json";
import { IBoss } from "@/types";

/**
 * Retrieve all available bosses in Dark Souls 2.
 * @returns {IBoss[]} The list of bosses in Dark Souls 2.
 */
const getBosses = (): IBoss[] => {
  const bosses: IBoss[] = bossesJson as IBoss[];
  return bosses;
};

export { getBosses };
