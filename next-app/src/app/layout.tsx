import './globals.css';

import type { Metadata } from 'next';
import { ReactElement, ReactNode } from 'react';

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
 * The root layout that wraps all route component.
 * @param {Readonly<{ children: ReactNode }>} props - The component props of the layout.
 * @returns {ReactElement} The rendered layout and it's children.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
    return (
        <html lang="en">
            <body className="dark:bg-black dark:text-white">{children}</body>
        </html>
    );
}
