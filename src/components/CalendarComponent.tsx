import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Não esqueça do CSS!

// Definindo os tipos para bater com o que o react-calendar espera
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type CalendarProps = {
  selectedDate: Value;
  onChange: (date: Value) => void;
}

const CalendarComponent = ({ selectedDate, onChange }: CalendarProps) => {
  // Data mínima: início do dia atual (não permite selecionar dias anteriores)
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const handleChange = (value: Value) => {
    onChange(value);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Calendar
        onChange={handleChange}
        value={selectedDate}
        locale="pt-BR"
        minDate={minDate}
      />
    </div>
  );
};

export default CalendarComponent;