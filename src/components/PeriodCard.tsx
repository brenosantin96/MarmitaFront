import React from "react";

type PropsPeriodCard = {
  period: string;
  timePeriod: string;
  selected: boolean;
  onSelect: (period: string) => void;
};

const PeriodCard = ({ period, timePeriod, selected, onSelect }: PropsPeriodCard) => {
  return (
    <div
      onClick={() => onSelect(period)}
      className={`
        h-[85px]
        w-full
        sm:w-28
        cursor-pointer
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
        
        ${selected
          ? "border-green-700 text-green-700 bg-green-50"
          : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      <div className="font-bold text-base">{period}</div>
      <div className="text-sm">{timePeriod}</div>
    </div>
  );
};

export default PeriodCard;
