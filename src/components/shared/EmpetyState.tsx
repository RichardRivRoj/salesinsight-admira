import { BarChart3 } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

export default function EmptyState({
    title,
    description = "Intenta ajustar los filtros para ver más resultados",
    icon,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-rose-50 rounded-lg border border-rose-200">
            <div className="mb-4 text-rose-600">
                {icon || <BarChart3 className="w-12 h-12 mx-auto" />}
            </div>
            <h3 className="text-lg font-semibold text-rose-800 mb-2">
                {title}
            </h3>
            <p className="text-rose-600 mb-4 max-w-md">{description}</p>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
