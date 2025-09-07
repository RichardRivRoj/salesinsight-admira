export default function ChartSkeleton({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div
            className={`bg-white rounded-lg shadow-md p-4 animate-pulse ${className}`}
        >
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
        </div>
    );
}
