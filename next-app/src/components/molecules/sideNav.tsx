'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useMemo } from 'react';

import { IDictionary, IRoute } from '@/types';

interface ISideNavProps {
    dic: IDictionary;
    currentLang: string;
}

/**
 * Side navigation bar.
 * @param {ISideNavProps} props - The component properties.
 * @returns {ReactElement} The rendered side navigation bar.
 */
export default function SideNav(props: ISideNavProps): ReactElement {
    const currentPathname = usePathname();
    const routes = useMemo(
        (): IRoute[] => [
            {
                path: `/${props.currentLang}/dark-souls-1`,
                label: props.dic['darkSoulsOne_label'],
            },
            {
                path: `/${props.currentLang}/dark-souls-2`,
                label: props.dic['darkSoulsTwo_label'],
            },
            {
                path: `/${props.currentLang}/dark-souls-3`,
                label: props.dic['darkSoulsThree_label'],
            },
            {
                path: `/${props.currentLang}/elden-ring`,
                label: props.dic['eldenRing_label'],
            },
            {
                path: `/${props.currentLang}/bloodborne`,
                label: props.dic['bloodborne_label'],
            },
            {
                path: `/${props.currentLang}/sekiro`,
                label: props.dic['sekiro_label'],
            },
        ],
        [props.currentLang, props.dic],
    );

    return (
        <nav className="flex flex-col py-10 border-r">
            {routes.map((r) => (
                <Link className="px-5 py-2 relative" key={`route-${r.path}`} href={r.path}>
                    {r.path === currentPathname && <span className="absolute left-1 top-0 h-full border-l-2 border-black dark:border-white" />}
                    {r.label}
                </Link>
            ))}
        </nav>
    );
}
