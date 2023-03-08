import React, { FunctionComponent, ReactElement, useEffect } from 'react';

import { useStoreActions, useStoreState } from '../../../../store/store';
import NavigationTop from '../../navigation/navigationTop';
import Toast from '../../toast';
import { IBasicLayoutProps } from './properties';

/**
 * Basic layout to wrap children.
 *
 * @param {IBasicLayoutProps} props The component properties.
 * @returns {ReactElement} The basic layout component.
 */
const BasicLayout: FunctionComponent<IBasicLayoutProps> = (props): ReactElement => {
    /** The global state of the global notification to display. */
    const globalNotification = useStoreState((state) => state.ApplicationModel.globalNotification);
    /** Action to update the global notification to display. */
    const updateGlobalNotificationMessage = useStoreActions((actions) => actions.ApplicationModel.updateGlobalNotificationMessage);

    /** Automatically dismiss the global notification after some time. */
    useEffect(() => {
        let messageBarTimeout: number | undefined;
        if (globalNotification) {
            if (messageBarTimeout) {
                clearTimeout(messageBarTimeout);
            }
            messageBarTimeout = window.setTimeout(() => {
                updateGlobalNotificationMessage(undefined);
            }, 5000 + Math.ceil(globalNotification.message.length / 120) * 1000);
        }
        return () => {
            if (messageBarTimeout) {
                clearTimeout(messageBarTimeout);
            }
        };
    }, [globalNotification, updateGlobalNotificationMessage]);

    return (
        <div className="flex max-h-screen flex-1 flex-col">
            <NavigationTop enableGlobalSearch={props.enableGlobalSearch} />
            <div className="flex flex-1 overflow-hidden">{props.children}</div>
            {globalNotification && <Toast type={globalNotification.type} message={globalNotification.message} dismiss={() => updateGlobalNotificationMessage(undefined)} />}
        </div>
    );
};

export default BasicLayout;
