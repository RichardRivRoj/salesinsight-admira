import EmptyState from "@/components/shared/EmpetyState";
import { BarChart3, TrendingUp, Package, ShoppingCart } from "lucide-react";

interface ChartEmptyStateProps {
    chartType: "sales" | "margin" | "products" | "channel";
}

const chartConfig = {
    sales: {
        title: "Sin datos de ventas",
        description: "No hay datos de ventas para los filtros seleccionados",
        icon: <TrendingUp className="w-12 h-12 mx-auto" />,
    },
    margin: {
        title: "Sin datos de margen",
        description: "No hay datos de margen para los filtros seleccionados",
        icon: <BarChart3 className="w-12 h-12 mx-auto" />,
    },
    products: {
        title: "Sin datos de productos",
        description: "No hay datos de productos para los filtros seleccionados",
        icon: <Package className="w-12 h-12 mx-auto" />,
    },
    channel: {
        title: "Sin datos de canales",
        description: "No hay datos de canales para los filtros seleccionados",
        icon: <ShoppingCart className="w-12 h-12 mx-auto" />,
    },
};

export default function ChartEmptyState({ chartType }: ChartEmptyStateProps) {
    const config = chartConfig[chartType];

    return (
        <EmptyState
            title={config.title}
            description={config.description}
            icon={config.icon}
        />
    );
}
