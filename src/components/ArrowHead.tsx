import React from "react";
import { ARROW_HEAD } from "../constants/dragSize";

interface ArrowHeadProps {
  x: number;
  y: number;
  rotation: number;
}

export const ArrowHead: React.FC<ArrowHeadProps> = ({ x, y, rotation }) => (
  <g transform={`translate(${x}, ${y})`}>
    <polygon
      className="arrowHead"
      points={`0,0 -3,${ARROW_HEAD} +3,${ARROW_HEAD}`}
      transform={`rotate(${rotation})`}
    />
  </g>
);
