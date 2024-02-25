import { FromSoftwareGame } from '../../enumerations';
import useRoutes from '../useRoutes';

/**
 * Helper function to build the canonical url based on the given fromsoftware game type and the host url.
 * @param {FromSoftwareGame} fromSoftwareGame The fromsoftware game type.
 * @param {string | null | undefined} hostUrl The determined host url.
 * @returns {string | undefined} The canonical url.
 */
const useCanonicalGameUrl = (fromSoftwareGame: FromSoftwareGame, hostUrl?: string | null): string | undefined => {
    // Get all available routes.
    const availableRelativeRoutes = useRoutes();
    // If the host url is not set or the fromsoftware game is not set, return undefined.
    if (!hostUrl || fromSoftwareGame === FromSoftwareGame.Undefined) {
        return undefined;
    }
    // Get the possible urls for the given fromsoftware game.
    const possibleUrls = availableRelativeRoutes.filter((r) => r.fromSoftwareGame === fromSoftwareGame);
    // If the option is not unique, throw an error.
    if (possibleUrls.length > 1) {
        throw new Error('Multiple routes found for the same game, can not build canonical URL.');
    }
    // Get the route path as relative url.
    const relativeUrl = possibleUrls[0]?.path;
    // Ensure that there is a single route for the given relative url.
    if (availableRelativeRoutes.filter((r) => r.path === relativeUrl).length > 1) {
        throw new Error('Multiple routes found for the same path, can not build canonical URL.');
    }
    // Return the canonical url.
    return `${hostUrl}${relativeUrl}`;
};

export default useCanonicalGameUrl;
