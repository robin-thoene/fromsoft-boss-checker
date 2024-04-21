import '../globals.css';

import type { Metadata } from 'next';
import { ReactElement, ReactNode } from 'react';

import { SideNav } from '@/components/molecules';
import { getDictionary } from '@/dictionaries';
import { IPageParams } from '@/types';

const metaTitle = 'fromsoft-boss-checker';
const metaDesc = 'Checklist for bosses of popular FromSoftware games.';

export const metadata: Metadata = {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
        title: metaTitle,
        description: metaDesc,
    },
    verification: {
        google: '9jnA_rAxxb5B8dnl-yvKFsd0Mq1sxsv5rEZnFy963bQ',
    },
};

/**
 * The root layout that wraps all route component with multi language support.
 * @param {Readonly<{ children: ReactNode, params: IPageParams }>} props - The component props of the layout.
 * @returns {Promise<ReactElement>} The rendered layout and it's children.
 */
export default async function RootLayout({ children, params }: Readonly<{ children: ReactNode; params: IPageParams }>): Promise<ReactElement> {
    // Get the translations dictionary for the requested language.
    const dict = await getDictionary(params.lang);

    return (
        <html lang={params.lang}>
            <body className="dark:bg-black dark:text-white flex flex-row overflow-hidden">
                <SideNav currentLang={params.lang} dic={dict} />
                <main className="flex flex-1 max-h-screen overflow-auto">{children}</main>
            </body>
        </html>
    );
}
