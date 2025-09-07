import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { sendToWebhook } from "@/lib/webhook";

import { SalesData } from "@/types";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");

    try {
        // Leer el archivo JSON con los datos mock
        const filePath = path.join(process.cwd(), "data", "mockData.json");
        const jsonData = await fs.readFile(filePath, "utf-8");
        const data: SalesData = JSON.parse(jsonData);

        // Filtrar los datos según los parámetros de consulta
        let filteredSales = data.sales;

        if (startDate && endDate) {
            filteredSales = filteredSales.filter((sale) => {
                const saleDate = new Date(sale.date);
                return (
                    saleDate >= new Date(startDate) &&
                    saleDate <= new Date(endDate)
                );
            });
        }

        if (category && category !== "todas") {
            filteredSales = filteredSales.filter(
                (sale) => sale.category === category
            );
        }

        // Transformación: Distribución por canal de venta
        const salesByChannel = filteredSales.reduce(
            (acc: { [key: string]: number }, sale) => {
                if (!acc[sale.sales_channel]) acc[sale.sales_channel] = 0;
                acc[sale.sales_channel] += sale.quantity_sold * sale.unit_price;
                return acc;
            },
            {}
        );

        // Convertir a array para el gráfico
        const channelData = Object.entries(salesByChannel).map(
            ([channel, total]) => ({
                channel,
                total,
            })
        );

        // Registrar la llamada
        const logEntry = {
            ts: new Date().toISOString(),
            endpoint: "/api/sales/sales-by-channel",
            parameters: { startDate, endDate, category },
            status: 200,
            total_records: filteredSales.length,
        };

        const logFilePath = path.join(
            process.cwd(),
            "logs",
            "http_trace.jsonl"
        );
        await fs.mkdir(path.dirname(logFilePath), { recursive: true });
        await fs.appendFile(logFilePath, JSON.stringify(logEntry) + "\n");

        sendToWebhook(logEntry);

        return NextResponse.json({
            data: channelData,
            metadata: {
                total_records: filteredSales.length,
                date_range: {
                    min: data.metadata.date_range.min,
                    max: data.metadata.date_range.max,
                },
            },
        });
    } catch (error) {
        // Registrar error en el log
        const errorLogEntry = {
            ts: new Date().toISOString(),
            endpoint: "/api/sales/sales-by-channel",
            parameters: { startDate, endDate, category },
            status: 500,
            error: error instanceof Error ? error.message : "Unknown error",
            message: "Error procesando la solicitud",
        };

        const logFilePath = path.join(
            process.cwd(),
            "logs",
            "http_trace.jsonl"
        );
        await fs.appendFile(logFilePath, JSON.stringify(errorLogEntry) + "\n");

        // Enviar error al webhook
        sendToWebhook(errorLogEntry);

        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}