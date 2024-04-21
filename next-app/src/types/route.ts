/**
 * Represents a single navigation route.
 */
interface IRoute {
    /** The relative path off the route. */
    path: string;
    /** The label to display for the route name. */
    label: string;
}

export type { IRoute };
