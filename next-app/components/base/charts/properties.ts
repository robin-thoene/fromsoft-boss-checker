/**
 * General chart related properties.
 */
interface IChartProps {
    /** The array of data objects to display in the chart. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    /** Whether to display chart tooltips or not. */
    withTooltip?: boolean;
    /** Whether to display the chart legend or not. */
    withLegend?: boolean;
}

export type { IChartProps };
