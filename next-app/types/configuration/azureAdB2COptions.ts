/**
 * The configuration values regarding the azure ad b2c.
 */
interface IAzureAdB2COptions {
    /** The instance to use for b2c interactions. */
    instance: string;
    /** The domain to use for b2c interactions. */
    domain: string;
    /** The unique identifier of the b2c tenant. */
    tenantId: string;
    /** The relative path for callbacks after b2c user flow interactions. */
    callbackPath: string;
    /** The unique identifier of the client application to use for this UI project. */
    clientId: string;
    /** The name of the user flow to use for sign in and sign up. */
    signUpAndSignInFlow: string;
    /** The name of the user flow to use for sign up. */
    signUpFlow: string;
    /** The name of the user flow to use to reset a users password. */
    passwordResetFlow: string;
    /** The name of the user flow to use to edit a users profile. */
    profileEditFlow: string;
    /** The scopes to use for b2c interactions. */
    scopes: string[];
}

export type { IAzureAdB2COptions };
