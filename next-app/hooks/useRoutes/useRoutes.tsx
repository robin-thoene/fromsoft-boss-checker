import { useTranslation } from 'next-i18next';

import { FromSoftwareGame } from '../../enumerations';
import { IRoute } from './types';

/**
 * Hook to retrieve all available application routes translated.
 *
 * @returns {IRoute[]} All available route models.
 */
const useRoutes = (): IRoute[] => {
    /** Access to translations. */
    const { t } = useTranslation();

    return [
        {
            path: '/dark-souls-1',
            label: t('darkSoulsOneRouteLabel'),
            fromSoftwareGame: FromSoftwareGame.DarkSouls,
        },
        {
            path: '/dark-souls-2',
            label: t('darkSoulsTwoRouteLabel'),
            fromSoftwareGame: FromSoftwareGame.DarkSouls2,
        },
        {
            path: '/dark-souls-3',
            label: t('darkSoulsThreeRouteLabel'),
            fromSoftwareGame: FromSoftwareGame.DarkSouls3,
        },
        {
            path: '/elden-ring',
            label: t('eldenRingRouteLabel'),
            fromSoftwareGame: FromSoftwareGame.EldenRing,
        },
        {
            path: '/bloodborne',
            label: t('bloodborneRouteLabel'),
            fromSoftwareGame: FromSoftwareGame.Bloodborne,
        },
        {
            path: '/sekiro',
            label: t('sekiroRouteLabel'),
            fromSoftwareGame: FromSoftwareGame.Sekiro,
        },
    ];
};

export default useRoutes;
