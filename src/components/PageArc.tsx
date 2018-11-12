import * as React from 'react';
import { Arc, Coordinate } from '../utils/types';
import { round } from '../utils/round';
import Canvas from '../connected/Canvas';
import Code from '../connected/Code';
import { DragMove } from './DragMove';
import { DragDistance } from './DragDistance';
import { DragRotation } from './DragRotation';

type IProps = Arc & {
  setArcFlags: (
    { largeArcFlag, sweepFlag }: { largeArcFlag: boolean; sweepFlag: boolean }
  ) => void;
  setArcRotation: (coord: Coordinate) => void;
  setArcRadiusX: (coord: Coordinate) => void;
  setArcRadiusY: (coord: Coordinate) => void;
  setArcStartPoint: (coord: Coordinate) => void;
  setArcEndPoint: (coord: Coordinate) => void;
  setArcCenterPoint: (coord: Coordinate) => void;
};

export const PageArc: React.SFC<IProps> = ({
  x1,
  y1,
  x2,
  y2,
  largeArcFlag,
  sweepFlag,
  rx,
  ry,
  degree,
  cx,
  cy,
  rxDragX,
  rxDragY,
  ryDragX,
  ryDragY,
  angleDragX,
  angleDragY,
  setArcFlags,
  setArcRotation,
  setArcRadiusX,
  setArcRadiusY,
  setArcStartPoint,
  setArcEndPoint,
  setArcCenterPoint,
}) => {
  const arcAlternative = (_largeArcFlag: boolean, _sweepFlag: boolean) => {
    const onClick = () =>
      setArcFlags({ largeArcFlag: _largeArcFlag, sweepFlag: _sweepFlag });
    return (
      <g onClick={onClick}>
        <path
          className="presentationAlternativeBackground"
          d={`
            M ${x1} ${y1}
            A ${rx} ${ry} ${degree}
            ${+_largeArcFlag} ${+_sweepFlag},
            ${x2} ${y2}`}
        />
        <path
          className="presentationAlternative"
          d={`
            M ${x1} ${y1}
            A ${rx} ${ry} ${degree}
            ${+_largeArcFlag} ${+_sweepFlag},
            ${x2} ${y2}`}
        />
      </g>
    );
  };

  return (
    <div>
      <Canvas>
        <line className="presentationHelper" x1={cx} y1={cy} x2={rxDragX} y2={rxDragY} />
        <line className="presentationHelper" x1={cx} y1={cy} x2={ryDragX} y2={ryDragY} />
        {arcAlternative(false, false)}
        {arcAlternative(false, true)}
        {arcAlternative(true, false)}
        {arcAlternative(true, true)}
        <path
          className="presentation"
          d={`
              M ${x1} ${y1}
              A ${rx} ${ry} ${degree}
              ${+largeArcFlag} ${+sweepFlag},
              ${x2} ${y2}`}
        />
        <DragRotation
          x={angleDragX}
          y={angleDragY}
          degree={degree}
          changeCoord={setArcRotation}
        />
        <DragDistance
          x={rxDragX}
          y={rxDragY}
          degree={degree + 90}
          distance={rx}
          changeCoord={setArcRadiusX}
        />
        <DragDistance
          x={ryDragX}
          y={ryDragY}
          degree={degree}
          distance={ry}
          changeCoord={setArcRadiusY}
        />
        <DragMove x={x1} y={y1} changeCoord={setArcStartPoint} />
        <DragMove x={x2} y={y2} changeCoord={setArcEndPoint} />
        <DragMove x={cx} y={cy} changeCoord={setArcCenterPoint} />
      </Canvas>
      <Code>
        M {round(x1)} {round(y1)} A {round(rx)} {round(ry)}
        &nbsp;
        {round(degree)} {largeArcFlag ? 1 : 0} {sweepFlag ? 1 : 0}
        &nbsp;
        {round(x2)} {round(y2)}
      </Code>
    </div>
  );
};
