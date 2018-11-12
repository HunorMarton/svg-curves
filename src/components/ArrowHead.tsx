import * as React from 'react';
import { ARROW_HEAD } from '../constants/dragSize';

interface IProps {
  x: number;
  y: number;
  rotation: number;
}

export const ArrowHead: React.SFC<IProps> = ({ x, y, rotation }) => (
  <g transform={`translate(${x}, ${y})`}>
    <polygon
      className="arrowHead"
      points={`0,0 -3,${ARROW_HEAD} +3,${ARROW_HEAD}`}
      transform={`rotate(${rotation})`}
    />
  </g>
);
