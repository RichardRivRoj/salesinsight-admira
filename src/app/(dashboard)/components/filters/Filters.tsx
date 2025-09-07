"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
    dateFrom: Date | undefined;
    setDateFrom: (date: Date | undefined) => void;
    dateTo: Date | undefined;
    setDateTo: (date: Date | undefined) => void;
    category: string;
    setCategory: (category: string) => void;
    onFilter: () => void;
}

export default function Filters({
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    category,
    setCategory,
    onFilter,
}: FiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#4c0519]">
                Filtros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2 ">
                        Fecha Desde
                    </label>
                    <DatePicker date={dateFrom} setDate={setDateFrom} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Fecha Hasta
                    </label>
                    <DatePicker date={dateTo} setDate={setDateTo} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Categoría
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todas">
                                Todas las categorías
                            </SelectItem>
                            <SelectItem value="Tecnología">
                                Tecnología
                            </SelectItem>
                            <SelectItem value="Calzado">Calzado</SelectItem>
                            <SelectItem value="Muebles">Muebles</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button
                onClick={onFilter}
                className="mt-4 bg-[#e11d48] hover:bg-[#9f1239]"
            >
                Aplicar Filtros
            </Button>
        </div>
    );
}
