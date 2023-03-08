/**
 * The configuration values regarding the backend api.
 */
interface IApiOptions {
    /** The base url of the core api to use. */
    baseUrl: string;
    /** The scope to use for the core api. */
    scope: string;
}

export type { IApiOptions };
