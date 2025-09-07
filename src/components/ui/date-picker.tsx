'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { es } from 'date-fns/locale';

import { DatePickerProps } from '@/types';


export function DatePicker( {
    date,
    setDate,
    placeholder = 'Seleccionar fecha'
}: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4 text-[#9f1239]' />
                    {date ? format(date, 'PPP', { locale: es }) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
                <Calendar 
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    locale={es}
                />
            </PopoverContent>
        </Popover>
    );
}