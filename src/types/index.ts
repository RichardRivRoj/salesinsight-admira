export interface Sale {
    id: number;
    date: string;
    product: string;
    category: string;
    region: string;
    seller: string;
    quantity_sold: number;
    unit_price: number;
    unit_cost: number;
    sales_channel: string;
    client_type: string;
}

export interface SalesData {
    sales: Sale[];
    metadata: {
        total_records: number;
        update_date: string;
        date_range: {
            min: string;
            max: string;
        };
        categories: string[];
        regions: string[];
        sales_channels: string[];
        client_types: string[];
    };
}

export interface MonthlySales {
    month: string; // e.g., "2023-01"
    total_sales: number;
}

export interface DatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    placeholder?: string;
}

export interface LogEntry {
  ts: string;
  endpoint: string;
  parameters: {
    startDate: string | null;
    endDate: string | null;
    category: string | null;
  };
  status: number;
  total_records?: number;
  message?: string;
  error?: string;
}
