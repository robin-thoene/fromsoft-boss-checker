import { Action, action } from 'easy-peasy';

import { IGlobalNotification } from '../../types';

/**
 * Interface for the application store model.
 */
interface IApplicationModel {
    /** The notification to show globally. */
    globalNotification?: IGlobalNotification;
    /** Action to update the notification to show globally. */
    updateGlobalNotificationMessage: Action<IApplicationModel, IGlobalNotification | undefined>;
    /** Whether the side navigation menu is collapsed or not. */
    isSideNavCollapsed: boolean;
    /** Action to update whether the side navigation menu is collapsed or not. */
    updateIsSideNavCollapsed: Action<IApplicationModel, boolean>;
    /** The global search value. */
    globalSearchValue: string;
    /** Action to update the global search value. */
    updateGlobalSearchValue: Action<IApplicationModel, string>;
}

/**
 * The application store model.
 */
const ApplicationModel: IApplicationModel = {
    updateGlobalNotificationMessage: action((state, payload) => {
        state.globalNotification = payload;
    }),
    isSideNavCollapsed: false,
    updateIsSideNavCollapsed: action((state, payload) => {
        state.isSideNavCollapsed = payload;
    }),
    globalSearchValue: '',
    updateGlobalSearchValue: action((state, payload) => {
        state.globalSearchValue = payload;
    }),
};

export type { IApplicationModel };
export default ApplicationModel;
