import { createStore, createTypedHooks } from 'easy-peasy';

import ApplicationModel, { IApplicationModel } from './models/applicationModel';

/**
 * Interface for the store model.
 */
interface IStoreModel {
    /** The store model regarding global application states. */
    ApplicationModel: IApplicationModel;
}

/**
 * Model that represents the store.
 */
const StoreModel: IStoreModel = {
    ApplicationModel,
};

/**
 * The store.
 */
const Store = createStore(StoreModel);

// generate typed hooks
const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<IStoreModel>();

// offer typed hooks for consumers
export { Store, useStore, useStoreActions, useStoreDispatch, useStoreState };
