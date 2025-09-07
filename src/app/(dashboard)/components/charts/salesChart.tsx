"use client";

import { SimpleLineChart } from "@/components/charts/line-chart";
import { MonthlySales } from "@/types";
import ErrorAlert from "@/components/shared/ErrorAlert";
import ChartSkeleton from "@/components/shared/ChartSkeleton";
import ChartEmptyState from "./ChartEmpetyState";

interface SalesChartProps {
    data: MonthlySales[];
    loading?: boolean;
    error?: string | null;
}

export default function SalesChart({
    data,
    loading = false,
    error = null,
}: SalesChartProps) {
    if (loading) return <ChartSkeleton className="col-span-1 lg:col-span-2" />;

    if (error)
        return (
            <div className="col-span-1 lg:col-span-2">
                <ErrorAlert message={error} />
            </div>
        );

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl text-[#4c0519] font-semibold mb-4">
                Tendencia de Ventas Mensuales
            </h2>
            {data.length > 0 ? (
                <SimpleLineChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <ChartEmptyState chartType="sales" />
                </div>
            )}
        </div>
    );
}
