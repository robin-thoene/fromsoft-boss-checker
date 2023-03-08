import getConfig from 'next/config';

import { IConfiguration } from '../types';

/**
 * Build and return the configuration model for the public client.
 *
 * @returns {IConfiguration} The complete configuration model.
 */
const getClientConfig = (): IConfiguration => {
    const { publicRuntimeConfig } = getConfig();
    return publicRuntimeConfig as IConfiguration;
};

export { getClientConfig };
