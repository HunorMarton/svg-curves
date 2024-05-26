import * as React from "react";
import { merge, fromEvent } from "rxjs";
import { map, concatMap, takeUntil } from "rxjs/operators";
import { type Coordinate } from "../utils/types";
import { round } from "../utils/round";
import "./Drag.css";

interface DragProps {
  children: React.ReactNode;
  x: number;
  y: number;
  zoom: number;
  changeCoord: (coord: Coordinate) => void;
  desc?: string;
}

export const Drag: React.FC<DragProps> = ({
  children,
  x,
  y,
  zoom,
  changeCoord,
  desc,
}) => {
  const [dragging, setDragging] = React.useState(false);
  const size = 40;
  const draggableRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const mouseEventToCoordinate = (mouseEvent: MouseEvent) => ({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
    });
    const touchEventToCoordinate = (touchEvent: TouchEvent) => {
      touchEvent.preventDefault();
      return {
        x: touchEvent.touches[0].clientX,
        y: touchEvent.touches[0].clientY,
      };
    };

    const mouseDowns = fromEvent<MouseEvent>(
      draggableRef.current!,
      "mousedown"
    ).pipe(map(mouseEventToCoordinate));
    const mouseMoves = fromEvent<MouseEvent>(window, "mousemove").pipe(
      map(mouseEventToCoordinate)
    );
    const mouseUps = fromEvent<MouseEvent>(window, "mouseup");

    const touchStarts = fromEvent<TouchEvent>(
      draggableRef.current!,
      "touchstart"
    ).pipe(map(touchEventToCoordinate));
    const touchMoves = fromEvent<TouchEvent>(
      draggableRef.current!,
      "touchmove"
    ).pipe(map(touchEventToCoordinate));
    const touchEnds = fromEvent<TouchEvent>(window, "touchend");

    const dragStarts = merge(mouseDowns, touchStarts);
    const moves = merge(mouseMoves, touchMoves);
    const dragEnds = merge(mouseUps, touchEnds);

    const drags = dragStarts.pipe(
      concatMap((dragStartEvent) => {
        const xDelta = x - dragStartEvent.x * zoom;
        const yDelta = y - dragStartEvent.y * zoom;
        return moves.pipe(
          takeUntil(dragEnds),
          map((dragEvent) => {
            const x = dragEvent.x * zoom + xDelta;
            const y = dragEvent.y * zoom + yDelta;
            return { x, y };
          })
        );
      })
    );

    dragStarts.forEach(() => {
      setDragging(true);
    });

    drags.forEach((coordinate) => {
      changeCoord({ x: coordinate.x, y: coordinate.y });
    });

    dragEnds.forEach(() => {
      setDragging(false);
    });
  }, [changeCoord, x, y, zoom]);

  return (
    <g
      className={dragging ? "dragging" : "draggable"}
      ref={draggableRef}
      transform={`translate(${x},${y})`}
    >
      <circle x={-size / 2} y={-size / 2} r={size / 2} />
      {children}
      <text x={size / 2} y={-size / 2} textAnchor="left" stroke="none">
        {desc ? desc : `${round(x)}, ${round(y)}`}
      </text>
    </g>
  );
};
