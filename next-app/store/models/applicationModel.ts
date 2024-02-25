import { Action, action } from 'easy-peasy';

/**
 * Interface for the application store model.
 */
interface IApplicationModel {
    /** Whether the side navigation menu is collapsed or not. */
    isSideNavCollapsed: boolean;
    /** Action to update whether the side navigation menu is collapsed or not. */
    updateIsSideNavCollapsed: Action<IApplicationModel, boolean>;
}

/**
 * The application store model.
 */
const ApplicationModel: IApplicationModel = {
    isSideNavCollapsed: false,
    updateIsSideNavCollapsed: action((state, payload) => {
        state.isSideNavCollapsed = payload;
    }),
};

export type { IApplicationModel };
export default ApplicationModel;
