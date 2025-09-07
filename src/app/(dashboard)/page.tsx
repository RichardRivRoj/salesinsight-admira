"use client";

import { useState } from "react";
import { subMonths } from "date-fns";
import { useSalesData } from "@/hooks/useSalesData";
import { useMarginData } from "@/hooks/useMarginData";
import { useTopProducts } from "@/hooks/useTopProducts";
import { useSalesByChannel } from "@/hooks/useSalesByChannel";
import Filters from "./components/filters/Filters";
import SalesChart from "./components/charts/salesChart";
import MarginChart from "./components/charts/MarginChart";
import TopProductsChart from "./components/charts/TopProductsChart";
import SalesByChannelChart from "./components/charts/SalesByChannelChart";

import LoadingSpinner from "@/components/shared/LoadingSpinner";


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

    const {
        data: topProductsData,
        loading: topProductsLoading,
        error: topProductsError,
        refetch: refetchTopProducts,
    } = useTopProducts({
        dateFrom,
        dateTo,
        category,
    });

    const {
        data: salesByChannelData,
        loading: salesByChannelLoading,
        error: salesByChannelError,
        refetch: refetchSalesByChannel,
    } = useSalesByChannel({
        dateFrom,
        dateTo,
        category,
    });

    const handleFiltrar = () => {
        refetchSales();
        refetchMargin();
        refetchTopProducts();
        refetchSalesByChannel();
    };

    const anyLoading = salesLoading || marginLoading || topProductsLoading || salesByChannelLoading;
    const anyError = salesError || marginError || topProductsError || salesByChannelError;

    if (anyLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                    <span className="ml-2 text-lg">Cargando datos...</span>
                </div>
            </div>
        );
    }

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

            {anyError && (
                <div className="bg-[#ffe4e6] border border-[#fb7185] text-[#be123c] px-4 py-3 rounded mb-6">
                    {anyError}
                </div>
            )}

            {/* Gráfico de líneas */}
            <div className="mb-6">
                <SalesChart
                    data={salesData}
                    loading={salesLoading}
                    error={salesError}
                />
            </div>

            {/* Tres gráficos en una fila con tres columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TopProductsChart
                    data={topProductsData}
                    loading={topProductsLoading}
                    error={topProductsError}
                />
                <SalesByChannelChart
                    data={salesByChannelData}
                    loading={salesByChannelLoading}
                    error={salesByChannelError}
                />
            </div>

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
