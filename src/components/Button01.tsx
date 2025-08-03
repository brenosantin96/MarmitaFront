import React from 'react';

type Button01Props = {
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  fontWeight?: 'regular' | 'semibold' | 'bold';
  classes?: string;
  children: React.ReactNode;
  disabled?: boolean;
  outline?: boolean
  onClick?: () => any; // opcional, com ou sem retorno

};

const Button01 = ({
  backgroundColor = '',
  textColor = '',
  width = 'w-full',
  fontWeight = 'semibold',
  classes = '',
  children,
  disabled = false,
  outline = false,
  onClick,
}: Button01Props) => {
  
  const fontWeightClass = {
    regular: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[fontWeight];

  const disabledClasses = disabled
    ? 'bg-[#ececec] text-[#5b5b5f] opacity-70 cursor-not-allowed'
    : `${backgroundColor} ${textColor} cursor-pointer`;

  const outlineClasses = outline
    ? 'bg-[#fff] text-green-700 border-2 border-green-700'
    : `${textColor} ${backgroundColor}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-md ${width} ${fontWeightClass} shadow-md flex justify-center items-center text-sm transition-all ${disabledClasses} ${outlineClasses} ${classes} `}
    >
      {children}
    </button>
  );
};

export default Button01;