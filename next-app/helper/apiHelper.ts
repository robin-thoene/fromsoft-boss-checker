import { msalInstance } from '../pages/_app';
import { getClientConfig } from './configHelper';

/**
 * Custom error class for HTTP errors.
 */
class HttpError extends Error {
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        console.error(`HTTP Request (${status}): "${message}"`);
    }
    status = -1;
}

/**
 * Retrieves data from the API as a JSON object.
 *
 * @template T
 * @param {string} relativePath The relative path to the endpoint to query.
 * @param {AbortSignal} abortSignal An abort signal to cancel the request.
 * @param {boolean} anonymous Whether the request shall be anonymous, therefore without a bearer token.
 * @returns {Promise<T>} The result as an object.
 */
const getFromApi = async <T>(relativePath: string, abortSignal?: AbortSignal, anonymous?: boolean): Promise<T> => {
    return fetchApi(relativePath, 'GET', undefined, abortSignal, anonymous).then(async (response) => {
        if (response.ok) {
            return response.json() as Promise<T>;
        }
        const responseText = await response.text();
        let errorMessage = '';
        if (responseText) {
            errorMessage = JSON.parse(responseText);
        }
        throw new HttpError(response.status, errorMessage);
    });
};

/**
 * Posts a request to the backend API.
 *
 * @template T
 * @param {string} relativePath The relative path to the endpoint to query.
 * @param {any} body The object to put in the body of the request
 * @param {AbortSignal} abortSignal An abort signal to cancel the request.
 * @param {boolean} anonymous Whether the request shall be anonymous, therefore without a bearer token.
 * @returns {Promise<T>} The answer as an object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postToApi = async <T>(relativePath: string, body?: any, abortSignal?: AbortSignal, anonymous?: boolean): Promise<T> => {
    return fetchApi(relativePath, 'POST', body, abortSignal, anonymous).then(async (response) => {
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json() as Promise<T>;
            }
            return {} as Promise<T>;
        }
        const responseText = await response.text();
        let errorMessage = '';
        if (responseText) {
            const error = JSON.parse(responseText);
            if (typeof error === 'object') {
                if (error['detail'] !== undefined) {
                    errorMessage = error['detail'];
                } else {
                    console.warn(responseText);
                }
            }
        }
        throw new HttpError(response.status, errorMessage);
    });
};

/**
 * Deletes an object from the api.
 *
 * @template T
 * @param {string} relativePath The relative path to the endpoint to query.
 * @param {any} body The optional request body.
 * @param {AbortSignal} abortSignal An abort signal to cancel the request.
 * @returns {Promise<any>} The promise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteFromApi = async (relativePath: string, body?: any, abortSignal?: AbortSignal) => {
    return fetchApi(relativePath, 'DELETE', body, abortSignal);
};

/**
 * Calls the backend API.
 *
 * @param {string} relativePath The relative path to the endpoint to query.
 * @param {string} method The HTTP verb to use.
 * @param {any} body The object to put in the body of the request.
 * @param {AbortSignal} abortSignal An abort signal to cancel the request.
 * @param {boolean} anonymous Whether the request shall be anonymous, therefore without a bearer token.
 * @returns {Promise<any>} Returns the result if any.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchApi = async (relativePath: string, method: string, body?: any, abortSignal?: AbortSignal, anonymous?: boolean): Promise<any> => {
    const configuration = getClientConfig();
    const apiConfig = configuration.apiOptions;
    return await fetchWithHeader(`${apiConfig.baseUrl}/${relativePath}`, method, anonymous ? null : apiConfig.scope ? [apiConfig.scope] : null, body, abortSignal);
};

/**
 * Fetches the API with required default headers.
 *
 * @param {string} url The relative path to the endpoint to query.
 * @param {string} method The HTTP verb to use.
 * @param {string[]} scopes The scopes to request for authorization.
 * @param {any} body The object to put in the body of the request.
 * @param {AbortSignal} abortSignal An abort signal to cancel the request.
 * @returns {Promise<any>} Returns the result if any.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchWithHeader = async (url: string, method: string, scopes: string[] | null, body?: any, abortSignal?: AbortSignal): Promise<any> => {
    const headers = new Headers();
    headers.append('Time-Offset', `${-new Date().getTimezoneOffset()}`);
    headers.append('Access-Control-Allow-Origin', '*');
    if (scopes != null) {
        let account = msalInstance.getActiveAccount();
        if (!account) {
            const allAccounts = msalInstance.getAllAccounts();
            if (allAccounts.length > 0) {
                msalInstance.setActiveAccount(allAccounts[0]);
            }
            account = msalInstance.getActiveAccount();
        }
        if (account) {
            const token = await msalInstance.acquireTokenSilent({ scopes: scopes, account: account });
            headers.append('Authorization', `Bearer ${token.accessToken}`);
        }
    }
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Accept-Language', 'de-de');
    headers.append('Culture', navigator.language);
    const serializedBody = body !== undefined ? (JSON.stringify(body) as BodyInit) : null;
    return fetch(url, {
        method,
        headers: headers,
        signal: abortSignal,
        body: serializedBody,
    }).catch((error) => {
        throw error;
    });
};

export { deleteFromApi, getFromApi, postToApi };
