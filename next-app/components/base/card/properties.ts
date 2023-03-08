import { ReactElement } from 'react';
/**
 * The properties of a single card.
 */
interface ICardProps {
    /** The body text displayed inside Card */
    body?: string;
    /** The headline text displayed inside Card */
    headline?: string;
    /** The image displayed inside Card */
    image?: ReactElement;
    /** The footer displayed inside Card */
    footer?: ReactElement;
}

export default ICardProps;
