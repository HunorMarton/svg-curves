import * as React from "react";
import { type CubicBezier, type Coordinate } from "../utils/types";
import { round } from "../utils/round";
import { Canvas } from "../connected/Canvas";
import { Code } from "../connected/Code";
import { DragMove } from "./DragMove";

type PageCubicBezierProps = CubicBezier & {
  setCubicBezierStartPoint: (coord: Coordinate) => void;
  setCubicBezierControlPoint1: (coord: Coordinate) => void;
  setCubicBezierControlPoint2: (coord: Coordinate) => void;
  setCubicBezierEndPoint: (coord: Coordinate) => void;
};

export const PageCubicBezier: React.FC<PageCubicBezierProps> = ({
  x0,
  y0,
  x1,
  y1,
  x2,
  y2,
  x,
  y,
  setCubicBezierStartPoint,
  setCubicBezierControlPoint1,
  setCubicBezierControlPoint2,
  setCubicBezierEndPoint,
}) => (
  <div>
    <Canvas>
      <line className="presentationHelper" x1={x0} y1={y0} x2={x1} y2={y1} />
      <line className="presentationHelper" x1={x2} y1={y2} x2={x} y2={y} />
      <path
        className="presentation"
        d={`
              M ${x0} ${y0}
              C ${x1} ${y1},
              ${x2} ${y2},
              ${x} ${y}`}
      />
      <DragMove x={x0} y={y0} changeCoord={setCubicBezierStartPoint} />
      <DragMove x={x1} y={y1} changeCoord={setCubicBezierControlPoint1} />
      <DragMove x={x2} y={y2} changeCoord={setCubicBezierControlPoint2} />
      <DragMove x={x} y={y} changeCoord={setCubicBezierEndPoint} />
    </Canvas>
    <Code>
      M {round(x0)} {round(y0)} C {round(x1)} {round(y1)}, {round(x2)}{" "}
      {round(y2)}, {round(x)} {round(y)}
    </Code>
  </div>
);
