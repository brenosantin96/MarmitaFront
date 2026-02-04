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
  
  // O react-calendar passa o valor e o evento
  const handleChange = (value: Value) => {
    onChange(value);
  };

  return (
    <div className="flex items-center justify-center">
      <Calendar 
        onChange={handleChange} 
        value={selectedDate} 
        locale='pt-BR' 
      />
    </div>
  );
};

export default CalendarComponent;