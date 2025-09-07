"use client";

import { SimpleLineChart } from "@/components/charts/line-chart";
import { MonthlySales } from "@/types";

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

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl text-[#4c0519] font-semibold mb-4">
                Tendencia de Ventas Mensuales
            </h2>
            {data.length > 0 ? (
                <SimpleLineChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <p>Prueba</p>
                </div>
            )}
        </div>
    );
}
