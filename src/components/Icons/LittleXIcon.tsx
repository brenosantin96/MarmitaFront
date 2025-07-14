import React from 'react';
import { SVGProps } from '@/types/SVGType';

const LittleXIcon = ({
    color = "#D9224A",
    height = 10,
    width = 10,
    strokeColor,
    strokeWidth,
}: SVGProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.707107 2.12215L6.36396 7.779C6.75449 8.16952 7.38765 8.16952 7.77817 7.779C8.1687 7.38848 8.1687 6.75531 7.77817 6.36479L2.12132 0.707932C1.7308 0.317408 1.09763 0.317408 0.707107 0.707932C0.316582 1.09846 0.316582 1.73162 0.707107 2.12215Z" fill={color}></path><path d="M2.12132 7.7784L7.77817 2.12154C8.1687 1.73102 8.1687 1.09785 7.77817 0.707328C7.38765 0.316804 6.75449 0.316804 6.36396 0.707328L0.707107 6.36418C0.316582 6.75471 0.316582 7.38787 0.707107 7.7784C1.09763 8.16892 1.7308 8.16892 2.12132 7.7784Z" fill={color}></path></svg>
    );
};

export default LittleXIcon;
