import { ReactElement, ReactNode } from 'react';

/**
 * Root layout.
 * @param {Readonly<{ children: ReactNode}>} props - The component props of the layout.
 * @returns {ReactElement} The rendered layout and it's children.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactElement {
    return <>{children}</>;
}
