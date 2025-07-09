import React from 'react';
import { SVGProps } from '../../types/SVGType';

const MenuIcon = ({ width = 24, height = 24, color = "black", strokeColor = "black", strokeWidth = 2 }: SVGProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MenuIcon;
