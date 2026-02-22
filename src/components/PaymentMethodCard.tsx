"use client";

import React from "react";

type PaymentMethodCardProps = {
  label: string;
  value: "PIX" | "CARTAO";
  selected: boolean;
  onSelect: (value: "PIX" | "CARTAO") => void;
};

const PaymentMethodCard = ({
  label,
  value,
  selected,
  onSelect,
}: PaymentMethodCardProps) => {
  const handleClick = () => {
    onSelect(value);
    if (value === "PIX") {
      console.log("selecionado PIX");
    } else {
      console.log("selecionado CARTAO");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        min-h-[80px]
        min-w-[120px]
        aspect-square
        max-w-[140px]
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
        text-center
        px-2
        ${
          selected
            ? "border-green-600 bg-green-100 text-green-800"
            : "border-gray-300 bg-white text-black hover:border-gray-400"
        }
      `}
    >
      <span className="font-bold text-base">{label}</span>
    </div>
  );
};

export default PaymentMethodCard;
