"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { COLORS } from "@/lib/constants";

interface LineChartData {
    month: string;
    total_sales: number;
}

interface SimpleLineChartProps {
    data: LineChartData[];
}

export function SimpleLineChart({ data }: SimpleLineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                    formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        "Ventas",
                    ]}
                    labelFormatter={(value) => `Mes: ${value}`}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="total_sales"
                    stroke={COLORS[0]}
                    activeDot={{ r: 8 }}
                    name="Ventas Totales"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}