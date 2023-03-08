import React, { FunctionComponent, ReactElement } from 'react';

import { IColorPicker } from './properties';

/**
 * Custom color picker.
 *
 * @param {IColorPicker} props The component properties.
 * @returns {ReactElement} The color picker component.
 */
const ColorPicker: FunctionComponent<IColorPicker> = (props): ReactElement => {
    return <input type="color" className="h-9 w-9 cursor-pointer" value={props.color} onChange={(e) => props.onChange(e.target.value)} />;
};

export default ColorPicker;
