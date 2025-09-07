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

interface HorizontalBarChartData {
    product: string;
    quantity: number;
}

interface SimpleHorizontalBarChartProps {
    data: HorizontalBarChartData[];
}

export function SimpleHorizontalBarChart({
    data,
}: SimpleHorizontalBarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                layout="vertical"
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="product" width={100} />
                <Tooltip
                    formatter={(value) => [`${value} unidades`, "Cantidad"]}
                />
                <Legend />
                <Bar
                    dataKey="quantity"
                    fill={COLORS[2]}
                    name="Unidades Vendidas"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}