"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { COLORS } from "@/lib/constants";

interface BarChartData {
    category: string;
    margin: number;
}

interface SimpleBarChartProps {
    data: BarChartData[];
}

export function SimpleBarChart({ data }: SimpleBarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                    formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        "Margen",
                    ]}
                />
                <Legend />
                <Bar
                    dataKey="margin"
                    fill={COLORS[1]}
                    name="Margen de Ganancia"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}