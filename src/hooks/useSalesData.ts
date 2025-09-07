import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { MonthlySales } from "@/types";

interface Metadata {
    total_records: number;
    date_range: {
        min: string;
        max: string;
    };
}

interface UseSalesDataProps {
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    category: string;
}

export const useSalesData = ({
    dateFrom,
    dateTo,
    category,
}: UseSalesDataProps) => {
    const [data, setData] = useState<MonthlySales[]>([]);
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Usar useCallback para memorizar fetchSales
    const fetchSales = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (dateFrom)
                params.append("startDate", format(dateFrom, "yyyy-MM-dd"));
            if (dateTo) params.append("endDate", format(dateTo, "yyyy-MM-dd"));
            if (category && category !== "todas")
                params.append("category", category);

            const response = await fetch(`/api/sales?${params.toString()}`);

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            const result = await response.json();
            setData(result.data);
            setMetadata(result.metadata);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    }, [dateFrom, dateTo, category]); // Dependencias de fetchSales

    useEffect(() => {
        fetchSales();
    }, [fetchSales]); // Incluir fetchSales en las dependencias

    return { data, metadata, loading, error, refetch: fetchSales };
};
