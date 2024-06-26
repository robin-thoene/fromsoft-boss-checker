'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/atoms';
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
    const [show, setShow] = useState(false);
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
                path: `/${props.currentLang}/demon-souls`,
                label: props.dic['demonSouls_label'],
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

    useEffect(() => {
        /**
         * Function to handle light dismiss for the side navigation on mobile devices.
         */
        function lightDismiss() {
            setShow(false);
        }
        if (show) {
            document.addEventListener('click', lightDismiss);
        }
        return () => document.removeEventListener('click', lightDismiss);
    }, [show]);

    return (
        <>
            <nav className={`border-r fixed ${show ? 'left-0 h-screen bg-white dark:bg-black' : '-left-full'} sm:relative sm:left-auto`}>
                <div className="flex flex-col py-16 h-full relative">
                    <div className="absolute top-1 right-2 sm:hidden">
                        <Button icon={<XMarkIcon className="h-4 w-4" />} onClick={() => setShow(false)} />
                    </div>
                    {routes.map((r) => (
                        <Link className="px-5 py-2 relative" key={`route-${r.path}`} href={r.path}>
                            {r.path === currentPathname && <span className="absolute left-1 top-0 h-full border-l-2 border-black dark:border-white" />}
                            {r.label}
                        </Link>
                    ))}
                </div>
            </nav>
            {!show && (
                <div className="fixed top-1 left-0 flex sm:hidden">
                    <Button icon={<Bars3Icon className="h-4 w-4" />} onClick={() => setShow(true)} />
                </div>
            )}
        </>
    );
}
