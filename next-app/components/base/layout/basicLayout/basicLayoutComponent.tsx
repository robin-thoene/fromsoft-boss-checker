import React, { FunctionComponent, ReactElement } from 'react';

import NavigationSide from '../../navigation/navigationSide';
import NavigationTop from '../../navigation/navigationTop';
import { IBasicLayoutProps } from './properties';

/**
 * Basic layout to wrap children.
 * @param {IBasicLayoutProps} props The component properties.
 * @returns {ReactElement} The basic layout component.
 */
const BasicLayout: FunctionComponent<IBasicLayoutProps> = (props): ReactElement => {
    return (
        <div className="flex max-h-screen flex-1 flex-col">
            <NavigationTop />
            <div className="flex flex-1 overflow-hidden">
                <NavigationSide />
                {props.children}
            </div>
        </div>
    );
};

export default BasicLayout;
