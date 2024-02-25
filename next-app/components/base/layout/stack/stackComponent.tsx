import React, { FunctionComponent, MutableRefObject, ReactElement, useMemo, useRef } from 'react';

import { IStackProps } from './properties';

/**
 * Arranges child nodes vertically or horizontally with standardized spaces.
 * Default arrangement is vertically.
 * @param {IStackProps} props The component properties.
 * @returns {ReactElement} The stack component.
 */
const Stack: FunctionComponent<IStackProps> = (props): ReactElement => {
    /** The ref to the stack div. */
    const stackRef = useRef<HTMLDivElement>();

    /** Class name for the vertical alignment in the stack. */
    const verticalAlignClassName = useMemo((): string => {
        switch (props.verticalAlign) {
            case 'Baseline':
                return props.horizontal ? 'items-baseline' : 'justify-start';
            case 'Center':
                return props.horizontal ? 'items-center' : 'justify-center';
            case 'End':
                return props.horizontal ? 'items-end' : 'justify-end';
            case 'Start':
                return props.horizontal ? 'items-start' : 'justify-start';
            case 'Stretch':
                return 'items-stretch';
            default:
                return '';
        }
    }, [props.horizontal, props.verticalAlign]);

    /** Class name for the horizontal alignment in the stack. */
    const horizontalAlignClassName = useMemo((): string => {
        switch (props.horizontalAlign) {
            case 'Center':
                return props.horizontal ? 'justify-center' : 'items-center';
            case 'End':
                return props.horizontal ? 'justify-end' : 'items-end';
            case 'SpaceAround':
                return 'justify-around';
            case 'SpaceBetween':
                return 'justify-between';
            case 'SpaceEvenly':
                return 'justify-evenly';
            case 'Start':
                return props.horizontal ? 'justify-start' : 'items-start';
            default:
                return '';
        }
    }, [props.horizontal, props.horizontalAlign]);

    /** Class name for the gap. */
    const gapClassName = useMemo((): string => {
        const className = props.gapSize != null ? `gap-${props.gapSize}` : 'gap-4';
        return className;
    }, [props.gapSize]);

    /** Class name for the padding. */
    const paddingClassName = useMemo((): string => {
        const className = props.paddingSize != null ? `p-${props.paddingSize}` : 'p-0';
        return className;
    }, [props.paddingSize]);

    /** Class name for the height. */
    const widthClassName = useMemo((): string => {
        const className = props.width != null ? `w-${props.width}` : '';
        return className;
    }, [props.width]);

    /** Class name for the width. */
    const heightClassName = useMemo((): string => {
        const className = props.height != null ? `h-${props.height}` : '';
        return className;
    }, [props.height]);

    /** Class name for the max width. */
    const maxWidthClassName = useMemo((): string => {
        const className = props.maxWidth != null ? `max-w-${props.maxWidth}` : '';
        return className;
    }, [props.maxWidth]);

    /** Class name for the max height. */
    const maxHeightClassName = useMemo((): string => {
        const className = props.maxHeight != null ? `max-h-${props.maxHeight}` : '';
        return className;
    }, [props.maxHeight]);

    return (
        <div
            ref={stackRef as MutableRefObject<HTMLDivElement>}
            className={`flex ${props.horizontal ? 'flex-row' : 'flex-col'} ${
                props.wrap ? 'flex-wrap' : ''
            } ${verticalAlignClassName} ${horizontalAlignClassName} ${gapClassName} ${paddingClassName} 
            ${widthClassName} ${heightClassName} ${maxWidthClassName} ${maxHeightClassName}`}
        >
            {props.children}
        </div>
    );
};

export default Stack;
