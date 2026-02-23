import React from "react";

type PropsPeriodCard = {
  period: string;
  timePeriod: string;
  selected: boolean;
  onSelect: (period: string) => void;
  disabled?: boolean;
};

const PeriodCard = ({ period, timePeriod, selected, onSelect, disabled = false }: PropsPeriodCard) => {
  return (
    <div
      onClick={() => !disabled && onSelect(period)}
      className={`
        h-[85px]
        w-full
        sm:w-28
        rounded-md
        border
        shadow-sm
        flex
        flex-col
        justify-center
        items-center
        transition-all
        duration-200
        select-none
        ${disabled ? "cursor-not-allowed opacity-50 bg-gray-100 border-gray-200 pointer-events-none" : "cursor-pointer hover:border-gray-300"}
        
        ${!disabled && selected
          ? "border-green-700 text-green-700 bg-green-50"
          : !disabled
          ? "border-gray-200 bg-white"
          : ""
        }
      `}
    >
      <div className="font-bold text-base">{period}</div>
      <div className="text-sm">{timePeriod}</div>
    </div>
  );
};

export default PeriodCard;
