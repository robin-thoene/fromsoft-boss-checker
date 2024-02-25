import React, { FunctionComponent, ReactElement } from 'react';

import { ILabel } from './properties';

/**
 * Basic label to display text.
 * @param {ILabel} props The component properties.
 * @returns {ReactElement} The label component.
 */
const Label: FunctionComponent<ILabel> = (props): ReactElement => {
    return (
        <label className="label">
            <span className="label-text">{props.text}</span>
        </label>
    );
};

export default Label;
