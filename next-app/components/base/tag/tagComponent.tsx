import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { FunctionComponent, ReactElement } from 'react';

import IconButton from '../button/iconButton';
import { ITagProps } from './properties';

/**
 * Displays data as graphical tag.
 *
 * @param {ITagProps} props The component properties.
 * @returns {ReactElement} The tag component.
 */
const Tag: FunctionComponent<ITagProps> = (props): ReactElement => {
    return (
        <div className={`badge ${props.colorClassName} ${props.outlined && 'badge-outline'} gap-2 py-4`}>
            <div className="px-5">{props.text}</div>
            {props.onClickRemove && <IconButton padding={0} icon={<XMarkIcon height={20} width={20} />} onClick={props.onClickRemove} />}
        </div>
    );
};

export default Tag;
