/**
 * Properties of the color picker.
 */
interface IColorPicker {
    /** The current color value as hex code. */
    color?: string;
    /** The callback to execute to update the color. */
    onChange: (newColor: string) => void;
}

export type { IColorPicker };
