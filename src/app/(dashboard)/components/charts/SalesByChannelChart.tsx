"use client";

import { SimpleDonutChart } from "@/components/charts/donut-chart";
import { SalesByChannel } from "@/types";



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

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl text-[#4c0519] font-semibold mb-4">
                Distribución de Ventas por Canal
            </h2>
            {data.length > 0 ? (
                <SimpleDonutChart data={data} />
            ) : (
                <div className="text-center py-8">
                    <p>Prueba</p>
                </div>
            )}
        </div>
    );
}
