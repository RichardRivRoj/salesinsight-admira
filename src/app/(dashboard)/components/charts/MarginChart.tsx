"use client";

import { SimpleBarChart } from "@/components/charts/bar-chart";
import { MarginByCategory } from "@/types";

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

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl text-[#4c0519] font-semibold mb-4">
                Margen de Ganancia por Categoría
            </h2>
            {data.length > 0 ? (
                <SimpleBarChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <p>Prueba</p>
                </div>
            )}
        </div>
    );
}
