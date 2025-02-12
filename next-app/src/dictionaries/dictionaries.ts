import { IDictionary } from "@/types";
import "server-only";

const dictionaries: { [lngIdentifier: string]: () => Promise<IDictionary> } = {
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
