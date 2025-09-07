"use client";

import { useState } from "react";
import { subMonths } from "date-fns";
import { useSalesData } from "@/hooks/useSalesData";
import { useMarginData } from "@/hooks/useMarginData";
import Filters from "./components/filters/Filters";
import SalesChart from "./components/charts/salesChart";
import MarginChart from "./components/charts/MarginChart";


export default function DashboardPage() {
    const [dateFrom, setDateFrom] = useState<Date | undefined>(
        subMonths(new Date(2023, 0, 1), 0)
    );
    const [dateTo, setDateTo] = useState<Date | undefined>(
        new Date(2023, 11, 31)
    );
    const [category, setCategory] = useState<string>("todas");

    const {
        data: salesData,
        metadata: salesMetadata,
        loading: salesLoading,
        error: salesError,
        refetch: refetchSales,
    } = useSalesData({
        dateFrom,
        dateTo,
        category,
    });

    const {
        data: marginData,
        loading: marginLoading,
        error: marginError,
        refetch: refetchMargin,
    } = useMarginData({
        dateFrom,
        dateTo,
        category,
    });

    const handleFiltrar = () => {
        refetchSales();
        refetchMargin();
    };

    const anyLoading = salesLoading || marginLoading;
    const anyError = salesError || marginError;


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#881337]">
                Dashboard de Ventas
            </h1>

            <Filters
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                category={category}
                setCategory={setCategory}
                onFilter={handleFiltrar}
            />

            {/* Gráfico de líneas */}
            <div className="mb-6">
                <SalesChart
                    data={salesData}
                    loading={salesLoading}
                    error={salesError}
                />
            </div>

            {/* Gráfico de barras */}
            <div className="mb-6">
                <MarginChart
                    data={marginData}
                    loading={marginLoading}
                    error={marginError}
                />
            </div>

            {salesMetadata && (
                <div className="bg-[#ffe4e6] p-4 rounded-lg text-sm mt-6 text-[#881337]">
                    <p>
                        Total de registros:{" "}
                        {salesMetadata.total_records.toLocaleString()}
                    </p>
                    <p>
                        Rango de fechas disponible:{" "}
                        {new Date(
                            salesMetadata.date_range.min
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                            salesMetadata.date_range.max
                        ).toLocaleDateString()}
                    </p>
                </div>
            )}
        </div>
    );
}
