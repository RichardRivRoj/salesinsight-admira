import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { MarginByCategory, Metadata } from "@/types";

interface UseMarginDataProps {
    dateFrom?: Date;
    dateTo?: Date;
    category: string;
}

interface UseMarginDataReturn {
    data: MarginByCategory[];
    metadata: Metadata | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useMarginData({
    dateFrom,
    dateTo,
    category,
}: UseMarginDataProps): UseMarginDataReturn {
    const [data, setData] = useState<MarginByCategory[]>([]);
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (dateFrom)
                params.append("startDate", format(dateFrom, "yyyy-MM-dd"));
            if (dateTo) params.append("endDate", format(dateTo, "yyyy-MM-dd"));
            if (category && category !== "todas")
                params.append("category", category);

            const response = await fetch(
                `/api/sales/margin-by-category?${params.toString()}`
            );

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
            console.error("Error fetching margin data:", err);
        } finally {
            setLoading(false);
        }
    }, [dateFrom, dateTo, category]); // Dependencias de fetchData;

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, metadata, loading, error, refetch: fetchData };
}
