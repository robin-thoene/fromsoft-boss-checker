import format from 'date-fns/format';
import React, { FunctionComponent, ReactElement } from 'react';
import { CartesianGrid, Legend, Line, LineChart as RLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import useColorTheme from '../../../../hooks/useColorTheme';
import { ITimeSeriesChartProps } from './properties';

/**
 * Displays time series data in a line chart.
 *
 * @param {ITimeSeriesChartProps} props The component properties.
 * @returns {ReactElement} The time series line chart component.
 */
const TimeSeriesChart: FunctionComponent<ITimeSeriesChartProps> = (props): ReactElement => {
    /** Access to the current color theme. */
    const colors = useColorTheme();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RLineChart data={props.data}>
                {props.withCartesianGrid && <CartesianGrid stroke={colors['base-content']} strokeDasharray="8" />}
                <XAxis
                    dataKey={props.timeAxisKey}
                    stroke={colors['base-content']}
                    strokeWidth={2}
                    domain={['auto', 'auto']}
                    type="number"
                    tickFormatter={(unixTime) => format(unixTime, 'dd.MM.yyyy')}
                />
                <YAxis stroke={colors['base-content']} strokeWidth={2} />
                {props.withTooltip && (
                    <Tooltip
                        content={(props) =>
                            props.active && props.payload && props.payload.length ? (
                                <div className="p-2">
                                    <p>{format(props.label, 'dd.MM.yyyy')}</p>
                                    {props.payload.map((payload, i) => (
                                        <div style={{ color: payload.color }} key={`tooltip-${i}`}>{`${payload.name}: ${payload.value}`}</div>
                                    ))}
                                </div>
                            ) : null
                        }
                    />
                )}
                {props.withLegend && <Legend />}
                {props.lines.map((line, i) => (
                    <Line key={`line-${line.dataKey}-${i}`} type="monotone" dataKey={line.dataKey} stroke={line.strokeColor} />
                ))}
            </RLineChart>
        </ResponsiveContainer>
    );
};

export default TimeSeriesChart;
