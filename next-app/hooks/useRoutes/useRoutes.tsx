import { HomeIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import React from 'react';

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
            path: '/',
            label: t('homeRouteLabel'),
            icon: <HomeIcon className="h-5 w-5" />,
        },
        {
            path: '/dark-souls-1',
            label: t('darkSoulsOneRingRouteLabel'),
            icon: <HomeIcon className="h-5 w-5" />,
        },
        {
            path: '/elden-ring',
            label: t('eldenRingRouteLabel'),
            icon: <HomeIcon className="h-5 w-5" />,
        },
    ];
};

export default useRoutes;
