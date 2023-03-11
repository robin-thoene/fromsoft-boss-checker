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
            label: t('darkSoulsOneRingRouteLabel'),
        },
        {
            path: '/elden-ring',
            label: t('eldenRingRouteLabel'),
        },
    ];
};

export default useRoutes;
