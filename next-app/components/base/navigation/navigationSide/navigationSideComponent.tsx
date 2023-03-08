import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement } from 'react';

import useRoutes from '../../../../hooks/useRoutes';
import { useStoreActions, useStoreState } from '../../../../store/store';

/**
 * Navigation menu placed on the side of the screen.
 *
 * @returns {ReactElement} The side navigation component.
 */
const NavigationSide: FunctionComponent = (): ReactElement => {
    /** Access to translations. */
    const { t } = useTranslation();
    /** Access to the router. */
    const router = useRouter();
    /** Access to all available routes. */
    const routes = useRoutes();

    /** Whether the side navigation menu is collapsed or not. */
    const isSideNavCollapsed = useStoreState((state) => state.ApplicationModel.isSideNavCollapsed);
    /** Action to update whether the side navigation menu is collapsed or not. */
    const updateIsSideNavCollapsed = useStoreActions((actions) => actions.ApplicationModel.updateIsSideNavCollapsed);

    return (
        <div className="flex flex-col border-r border-base-200">
            <div className="flex flex-col py-10">
                {routes.map((r) => (
                    <Link key={r.path} href={r.path} tabIndex={-1}>
                        <button className="btn-ghost btn relative flex w-full items-center justify-start gap-4 rounded-none text-secondary">
                            {router.asPath === r.path && <div className="absolute left-1 top-1/2 h-3/5 -translate-y-1/2 border-r border-secondary" />}
                            {r.icon}
                            {!isSideNavCollapsed && r.label}
                        </button>
                    </Link>
                ))}
            </div>
            <div className="mt-auto">
                <button
                    aria-label={isSideNavCollapsed ? t('openSideNavAriaLabel') : t('collapseSideNavAriaLabel')}
                    className="btn-ghost btn flex w-full items-center justify-end rounded-none"
                    onClick={() => updateIsSideNavCollapsed(!isSideNavCollapsed)}
                >
                    {isSideNavCollapsed ? <ArrowRightIcon className="h-4 w-4 fill-secondary" /> : <ArrowLeftIcon className="h-4 w-4 fill-secondary" />}
                </button>
            </div>
        </div>
    );
};

export default NavigationSide;
