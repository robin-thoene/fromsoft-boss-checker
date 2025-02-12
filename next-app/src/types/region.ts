import { IBoss } from "./boss";

interface IRegion {
  id: number;
  name: string;
  bosses: IBoss[];
}

export type { IRegion };
