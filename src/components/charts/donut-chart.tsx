"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { COLORS } from "@/lib/constants";

interface DonutChartData {
    channel: string;
    total: number;
}

interface SimpleDonutChartProps {
    data: DonutChartData[];
}

export function SimpleDonutChart({ data }: SimpleDonutChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total"
                    nameKey="channel"
                    label={({ channel, total }) =>
                        `${channel}: $${total.toLocaleString()}`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        "Ventas",
                    ]}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}