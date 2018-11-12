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
  changeCoord: (coord: Coordinate) => void;
}

export const DragRotation: React.SFC<IProps> = ({ x, y, degree, changeCoord }) => {
  const innerCrossSize = CROSS_SIZE - ARROW_HEAD;

  return (
    <Drag x={x} y={y} changeCoord={changeCoord} desc={`${round(degree)}°`}>
      <g transform={`rotate(${degree})`}>
        <path
          className="arrowLine"
          d={`M 0 ${-innerCrossSize / 2} A ${15} ${15} 0 0 1 0 ${innerCrossSize / 2}`}
        />
        <ArrowHead x={-1} y={-CROSS_SIZE / 2} rotation={-25} />
        <ArrowHead x={-1} y={CROSS_SIZE / 2} rotation={205} />
      </g>
    </Drag>
  );
};
