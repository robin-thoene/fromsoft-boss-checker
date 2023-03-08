import { IChartProps } from '../properties';

/**
 * Definition of a single line in the line chart.
 */
interface ILineDefinition {
    /** The data object property name of the data to display. */
    dataKey: string;
    /** The desired HEX color code of the line. */
    strokeColor: string;
}

/**
 * Properties for a time series line chart.
 */
interface ITimeSeriesChartProps extends IChartProps {
    /** The definition of the lines to display in the chart. */
    lines: ILineDefinition[];
    /** Whether to display a cartesian grid or not. */
    withCartesianGrid?: boolean;
    /** The name of the property that contains the timestamp of the data point. */
    timeAxisKey: string;
}

export type { ITimeSeriesChartProps };
