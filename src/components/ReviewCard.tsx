"use client";

import React from "react";
import { Icon } from "./svg/Icon";

type PropsReviewCard = {
  description: string; // Receber em / Quarta, 25 de fev de 2026
  subdescription: string; // Avenida Paulista / Pela tarde, das 14h às 19h
  svg: string; // truck | money | calendar
  heightSvg: string; // 32px
  widthSvg: string; // 32px
  handleClick: () => void;
};

const ReviewCard = ({
  description,
  subdescription,
  svg,
  heightSvg,
  widthSvg,
  handleClick

}: PropsReviewCard) => {
 

  return (
    <div
      onClick={handleClick}
      className="
        flex
        items-center
        justify-between
        gap-3
        p-4
        rounded-md
        border
        border-gray-200
        bg-white
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-md
        select-none
      "
    >
      <div className="flex items-center gap-3">
        <Icon svg={svg} height={heightSvg} width={widthSvg} />
        <div className="flex flex-col">
          <span className="font-semibold text-base text-gray-800">{description}</span>
          <span className="text-sm text-gray-600">{subdescription}</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
        TROCAR
      </span>
    </div>
  );
};

export default ReviewCard;