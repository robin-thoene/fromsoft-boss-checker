/**
 * Properties of the file picker component.
 */
interface IFilePickerProps {
    /** The on change callback. */
    onChange: (files: File[]) => void;
    /** The optional label to display. */
    label?: string;
    /** Whether to allow picking multiple files or not. */
    multiple?: boolean;
    /** The allowed file type extensions. */
    allowedFileTypes?: string[];
}

export type { IFilePickerProps };
