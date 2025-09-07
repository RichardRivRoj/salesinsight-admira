"use client";

import { SimpleHorizontalBarChart } from "@/components/charts/horizontal-bar-chart";
import { TopProduct } from "@/types";
import ErrorAlert from "@/components/shared/ErrorAlert";
import ChartSkeleton from "@/components/shared/ChartSkeleton";
import ChartEmptyState from "./ChartEmpetyState";

interface TopProductsChartProps {
    data: TopProduct[];
    loading?: boolean;
    error?: string | null;
}

export default function TopProductsChart({
    data,
    loading = false,
    error = null,
}: TopProductsChartProps) {
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
                Top 5 Productos Más Vendidos
            </h2>
            {data.length > 0 ? (
                <SimpleHorizontalBarChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <ChartEmptyState chartType="products" />
                </div>
            )}
        </div>
    );
}
