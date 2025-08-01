import React from 'react';
import { SVGProps } from '@/types/SVGType';

const LocationIcon2 = ({
  color = "#000",
  height = 24,
  width = 24,
  strokeColor = "#000000",
  strokeWidth = 1.5,
}: SVGProps) => {
  return (
    <svg width={width} height={height} viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="Page-1" stroke="none" strokeWidth="1" fill={color} fillRule="evenodd" >
        <g id="Icon-Set" transform="translate(-104.000000, -411.000000)" fill="#000000">
          <path d="M116,426 C114.343,426 113,424.657 113,423 C113,421.343 114.343,420 116,420 C117.657,420 119,421.343 119,423 C119,424.657 117.657,426 116,426 L116,426 Z M116,418 C113.239,418 111,420.238 111,423 C111,425.762 113.239,428 116,428 C118.761,428 121,425.762 121,423 C121,420.238 118.761,418 116,418 L116,418 Z M116,440 C114.337,440.009 106,427.181 106,423 C106,417.478 110.477,413 116,413 C121.523,413 126,417.478 126,423 C126,427.125 117.637,440.009 116,440 L116,440 Z M116,411 C109.373,411 104,416.373 104,423 C104,428.018 114.005,443.011 116,443 C117.964,443.011 128,427.95 128,423 C128,416.373 122.627,411 116,411 L116,411 Z" id="location">

          </path>
        </g>
      </g>
    </svg>
  );
};

export default LocationIcon2;
