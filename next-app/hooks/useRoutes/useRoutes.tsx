import { useTranslation } from 'next-i18next';

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
        },
        {
            path: '/dark-souls-2',
            label: t('darkSoulsTwoRouteLabel'),
        },
        {
            path: '/dark-souls-3',
            label: t('darkSoulsThreeRouteLabel'),
        },
        {
            path: '/elden-ring',
            label: t('eldenRingRouteLabel'),
        },
        {
            path: '/bloodborne',
            label: t('bloodborneRouteLabel'),
        },
    ];
};

export default useRoutes;
