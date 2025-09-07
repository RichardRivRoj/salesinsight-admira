import { AlertCircle } from "lucide-react";

export default function ErrorAlert({
    message,
    className = "",
}: {
    message: string;
    className?: string;
}) {
    return (
        <div
            className={`bg-[#fff1f2] border border[#fecdd3] rounded-md p-4 ${className}`}
        >
            <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-[#fb7185] mr-2" />
                <span className="text-[#9f1239]">{message}</span>
            </div>
        </div>
    );
}
