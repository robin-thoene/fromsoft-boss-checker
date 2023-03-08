import React, { FunctionComponent, ReactElement, useMemo } from 'react';
import { Cell, Legend, Pie, PieChart as RPieChart, ResponsiveContainer, Tooltip } from 'recharts';

import useColorTheme from '../../../../hooks/useColorTheme';
import { IPieChartProps } from './properties';

/**
 * Displays data in a pie chart.
 *
 * @param {IPieChartProps} props The properties of the pie chart.
 * @returns {ReactElement} The pie chart component.
 */
const PieChart: FunctionComponent<IPieChartProps> = (props): ReactElement => {
    /** Access to the current color theme. */
    const colors = useColorTheme();

    /** The colors to use for the chart sections. */
    const COLORS = useMemo(() => [colors['chart-blue'], colors['chart-green'], colors['chart-orange'], colors['chart-yellow']], [colors]);

    /**
     * Callback to render the customized label.
     *
     * @param {{ cx: number; x: number; y: number; percent: number }} props The properties of the label rendering callback.
     * @returns {ReactElement} The rendered label.
     */
    const renderCustomizedLabel = ({ cx, x, y, percent }: { cx: number; x: number; y: number; percent: number }): ReactElement => {
        return (
            <text x={x} y={y} fill={colors['base-content']} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)} %`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RPieChart>
                {props.withTooltip && (
                    <Tooltip
                        content={(props) =>
                            props.active && props.payload && props.payload.length ? (
                                <div className="px-2">
                                    <p>{`${props.payload[0].name} : ${props.payload[0].value}`}</p>
                                </div>
                            ) : null
                        }
                    />
                )}
                {props.withLegend && <Legend />}
                <Pie
                    data={props.data}
                    dataKey={props.dataKey}
                    label={props.withLabels ? renderCustomizedLabel : undefined}
                    nameKey={props.nameKey}
                    labelLine={false}
                    innerRadius={'55%'}
                    outerRadius={'75%'}
                >
                    {props.data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </RPieChart>
        </ResponsiveContainer>
    );
};

export default PieChart;
