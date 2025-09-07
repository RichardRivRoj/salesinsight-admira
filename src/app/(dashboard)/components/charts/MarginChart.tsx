"use client";

import { SimpleBarChart } from "@/components/charts/bar-chart";
import { MarginByCategory } from "@/types";
import ErrorAlert from "@/components/shared/ErrorAlert";
import ChartSkeleton from "@/components/shared/ChartSkeleton";
import ChartEmptyState from "./ChartEmpetyState";

interface MarginChartProps {
    data: MarginByCategory[];
    loading?: boolean;
    error?: string | null;
}

export default function MarginChart({
    data,
    loading = false,
    error = null,
}: MarginChartProps) {
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
                Margen de Ganancia por Categoría
            </h2>
            {data.length > 0 ? (
                <SimpleBarChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <ChartEmptyState chartType="margin" />
                </div>
            )}
        </div>
    );
}
