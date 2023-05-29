import { ReactElement } from 'react';

import { FromSoftwareGame } from '../../enumerations';

/**
 * Represents a single navigation route.
 */
interface IRoute {
    /** The relative path off the route. */
    path: string;
    /** The icon to render for the route. */
    icon?: ReactElement;
    /** The label to display for the route name. */
    label: string;
    /** The fromsoftware game that the route represents. */
    fromSoftwareGame?: FromSoftwareGame;
}

export type { IRoute };
