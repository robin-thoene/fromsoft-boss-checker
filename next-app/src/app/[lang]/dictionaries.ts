import 'server-only';

const dictionaries: { [lngIdentifier: string]: () => Promise<{ [key: string]: string }> } = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
