import * as React from 'react';
import { CROSS_SIZE, ARROW_HEAD } from '../constants/dragSize';
import { Coordinate } from '../utils/types';
import Drag from '../connected/Drag';
import { ArrowHead } from './ArrowHead';

interface IProps {
  x: number;
  y: number;
  changeCoord: (coord: Coordinate) => void;
}

export const DragMove: React.SFC<IProps> = ({ x, y, changeCoord }) => {
  const innerCrossSize = CROSS_SIZE - ARROW_HEAD;

  return (
    <Drag x={x} y={y} changeCoord={changeCoord}>
      <line
        className="arrowLine"
        x1={-innerCrossSize / 2}
        y1={0}
        x2={innerCrossSize / 2}
        y2={0}
      />
      <line
        className="arrowLine"
        x1={0}
        y1={-innerCrossSize / 2}
        x2={0}
        y2={innerCrossSize / 2}
      />
      <ArrowHead x={0} y={-CROSS_SIZE / 2} rotation={0} />
      <ArrowHead x={0} y={CROSS_SIZE / 2} rotation={180} />
      <ArrowHead x={-CROSS_SIZE / 2} y={0} rotation={270} />
      <ArrowHead x={CROSS_SIZE / 2} y={0} rotation={90} />
    </Drag>
  );
};
