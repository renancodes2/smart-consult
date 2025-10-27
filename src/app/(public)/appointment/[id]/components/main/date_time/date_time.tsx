"use client"

import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import { JSX, useState } from "react";

registerLocale("pt-BR", ptBR);

interface DateTimneProps {
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  initialDateTime?: Date;
  onChangeDate: (date: Date) => void;
}
export function DateTime({ 
  className, 
  maxDate, 
  minDate, 
  initialDateTime,  
  onChangeDate
 }: DateTimneProps): JSX.Element {

  const [initialDate, setInitialDate] = useState(initialDateTime ?? new Date);

  const handleNewdateTime = (date: Date | null) => {
    if(!date) return;
    setInitialDate(date)
    onChangeDate(date)
  }

  return (
    <DatePicker
      minDate={minDate} 
      maxDate={maxDate}
      className={className}
      locale="pt-BR"
      selected={initialDate}
      onChange={handleNewdateTime}
      dateFormat="dd/MM/yyyy"
    />
  )
  
}