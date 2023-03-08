import { IApiOptions } from './apiOptions';
import { IAzureAdB2COptions } from './azureAdB2COptions';
import { IAzureAdOptions } from './azureAdOptions';
import { IUiOptions } from './uiOptions';

/**
 * The configuration model to send to the client.
 */
interface IConfiguration {
    /** The configuration values regarding the azure ad. */
    azureAdOptions: IAzureAdOptions;
    /** The configuration values regarding the backend api. */
    apiOptions: IApiOptions;
    /** The configuration values regarding the azure ad b2c. */
    azureAdB2COptions: IAzureAdB2COptions;
    /** General option for the client ui. */
    uiOptions: IUiOptions;
}

export type { IConfiguration };
