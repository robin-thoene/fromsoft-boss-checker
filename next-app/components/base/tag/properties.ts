/**
 * Properties for the tag component.
 */
interface ITagProps {
    /** The text to display. */
    text: string;
    /** Optional callback to execute when clicking the tag remove button. */
    onClickRemove?: () => void;
    /** Option to choose a color for the tag. */
    colorClassName?: string;
    /** Option to make the tag appear only outlined. */
    outlined?: boolean;
}

export type { ITagProps };
