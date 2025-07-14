import React from 'react';

type Button01Props = {
  backgroundColor?: string;
  textColor?: string;
  width?: string;
  fontWeight?: 'regular' | 'semibold' | 'bold';
  classes?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const Button01 = ({
  backgroundColor = 'bg-green-700',
  textColor = 'text-white',
  width = 'w-full',
  fontWeight = 'semibold',
  classes = '',
  children,
  disabled = false
}: Button01Props) => {
  const fontWeightClass = {
    regular: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[fontWeight];

  const disabledClasses = disabled
    ? 'bg-[#ececec] text-[#5b5b5f] opacity-70 cursor-not-allowed'
    : `${backgroundColor} ${textColor} cursor-pointer`;

  return (
    <button
      disabled={disabled}
      className={`p-3 rounded-md ${width} ${fontWeightClass} flex justify-center items-center text-sm transition-all ${disabledClasses} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button01;