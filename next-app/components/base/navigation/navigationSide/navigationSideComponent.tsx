import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent, ReactElement } from 'react';

import useRoutes from '../../../../hooks/useRoutes';

/**
 * Navigation menu placed on the side of the screen.
 * @returns {ReactElement} The side navigation component.
 */
const NavigationSide: FunctionComponent = (): ReactElement => {
    /** Access to the router. */
    const router = useRouter();
    /** Access to all available routes. */
    const routes = useRoutes();

    return (
        <div className="flex flex-col border-r border-base-200">
            <div className="flex flex-col py-10">
                {routes.map((r) => (
                    <Link key={r.path} href={r.path} tabIndex={-1}>
                        <button className="btn-ghost btn relative flex w-full items-center justify-start gap-4 rounded-none text-secondary">
                            {router.asPath === r.path && <div className="absolute left-1 top-1/2 h-3/5 -translate-y-1/2 border-r border-secondary" />}
                            {r.icon && r.icon}
                            {r.label}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavigationSide;
