import { SVGProps } from '@/types/SVGType'
import React from 'react'

const CloseIcon2 = ({width = 20, height = 20, color = "#000", strokeColor, strokeWidth} : SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20">
    <g fill="none" fill-rule="evenodd">
        <path d="M-2-2h24v24H-2z"/>
        <path fill={color} fill-rule="nonzero" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM6.464 6.464a1 1 0 0 1 1.415 0L10 8.586l2.121-2.122a1 1 0 0 1 1.32-.083l.095.083a1 1 0 0 1 0 1.415L11.414 10l2.122 2.121a1 1 0 0 1 .083 1.32l-.083.095a1 1 0 0 1-1.415 0L10 11.414l-2.121 2.122a1 1 0 0 1-1.32.083l-.095-.083a1 1 0 0 1 0-1.415L8.586 10 6.464 7.879a1 1 0 0 1-.083-1.32z"/>
    </g>
</svg>
  )
}

export default CloseIcon2