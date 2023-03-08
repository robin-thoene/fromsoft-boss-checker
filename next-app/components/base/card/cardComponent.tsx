import React, { FunctionComponent, ReactElement } from 'react';

import ICardProps from './properties';

/**
 * Styled card to display data.
 *
 * @param {ICardProps} props The component properties.
 * @returns {ReactElement} The card component.
 */
const Card: FunctionComponent<ICardProps> = (props): ReactElement => {
    return (
        <div className="card card-compact w-96 rounded-md shadow-xl shadow-base-300">
            <div>
                {props.image}
                <div className="card-body">
                    <h3 className="card-title">{props.headline}</h3>
                    <p>{props.body}</p>
                    <div className="card-actions">{props.footer}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
