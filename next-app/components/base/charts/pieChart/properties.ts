import { IChartProps } from '../properties';

/**
 * Properties for a pie chart.
 */
interface IPieChartProps extends IChartProps {
    /** The key of the data property to display. */
    dataKey: string;
    /** The key of the data property to display the name. */
    nameKey?: string;
    /** Whether to render labels or not. */
    withLabels?: boolean;
}

export type { IPieChartProps };
