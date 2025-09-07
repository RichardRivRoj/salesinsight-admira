"use client";

import { SimpleDonutChart } from "@/components/charts/donut-chart";
import { SalesByChannel } from "@/types";
import ErrorAlert from "@/components/shared/ErrorAlert";
import ChartSkeleton from "@/components/shared/ChartSkeleton";
import ChartEmptyState from "./ChartEmpetyState";


interface SalesByChannelChartProps {
    data: SalesByChannel[];
    loading?: boolean;
    error?: string | null;
}

export default function SalesByChannelChart({
    data,
    loading = false,
    error = null,
}: SalesByChannelChartProps) {
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
                Distribución de Ventas por Canal
            </h2>
            {data.length > 0 ? (
                <SimpleDonutChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <ChartEmptyState chartType="channel" />
                </div>
            )}
        </div>
    );
}
