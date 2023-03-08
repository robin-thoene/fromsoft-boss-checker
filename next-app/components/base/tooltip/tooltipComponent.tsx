import React, { FunctionComponent, ReactElement } from 'react';

import { ITooltipProps } from './properties';

/**
 * Displays additional information as overlaying tooltip.
 *
 * @param {ITooltipProps} props The component properties.
 * @returns {ReactElement} The tooltip component.
 */
const Tooltip: FunctionComponent<ITooltipProps> = (props): ReactElement => {
    return (
        <div
            className={`tooltip w-max ${
                props.direction === 'Left' ? 'tooltip-left' : props.direction === 'Right' ? 'tooltip-right' : props.direction === 'Bottom' ? 'tooltip-bottom' : 'tooltip-top'
            }`}
            data-tip={props.text}
        >
            {props.children}
        </div>
    );
};

export default Tooltip;
