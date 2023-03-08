/**
 * The configuration values regarding the azure ad.
 */
interface IAzureAdOptions {
    /** The instance to use for interactions. */
    instance: string;
    /** The domain to use for interactions. */
    domain: string;
    /** The unique identifier of the tenant. */
    tenantId: string;
    /** The relative path for callbacks. */
    callbackPath: string;
    /** The unique identifier of the client application to use for this UI project. */
    clientId: string;
}

export type { IAzureAdOptions };
