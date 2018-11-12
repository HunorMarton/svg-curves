import * as React from 'react';
import { CROSS_SIZE, ARROW_HEAD } from '../constants/dragSize';
import { Coordinate } from '../utils/types';
import { round } from '../utils/round';
import Drag from '../connected/Drag';
import { ArrowHead } from './ArrowHead';

interface IProps {
  x: number;
  y: number;
  degree: number;
  distance: number;
  changeCoord: (coord: Coordinate) => void;
}

export const DragDistance: React.SFC<IProps> = ({
  x,
  y,
  degree,
  distance,
  changeCoord,
}) => {
  const innerCrossSize = CROSS_SIZE - ARROW_HEAD;

  return (
    <Drag x={x} y={y} changeCoord={changeCoord} desc={`${round(distance)}`}>
      <g transform={`rotate(${degree})`}>
        <line
          className="arrowLine"
          x1={0}
          y1={-innerCrossSize / 2}
          x2={0}
          y2={innerCrossSize / 2}
        />
        <ArrowHead x={0} y={-CROSS_SIZE / 2} rotation={0} />
        <ArrowHead x={0} y={CROSS_SIZE / 2} rotation={180} />
      </g>
    </Drag>
  );
};
