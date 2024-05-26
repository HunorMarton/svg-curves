import React, { useEffect } from "react";
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import * as mainViewBox from "../constants/mainViewBoxSize.ts";
import "./Canvas.css";

interface CanvasProps {
  children: React.ReactNode;
  svgWidth: number;
  svgHeight: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  resize: ({ width, height }: { width: number; height: number }) => void;
}

export const Canvas: React.FC<CanvasProps> = (props) => {
  useEffect(() => {
    const resizeSubscription = fromEvent(window, "resize")
      .pipe(
        map(() => ({
          width: window.innerWidth,
          height: window.innerHeight,
        }))
      )
      .subscribe(({ width, height }) => {
        props.resize({ width, height });
      });

    return () => {
      resizeSubscription.unsubscribe();
    };
  }, [props.resize]);

  const crossSize = 20;
  const mainViewBoxMarginHorizontal =
    (props.viewBoxWidth - mainViewBox.WIDTH) / 2;
  const mainViewBoxMarginVertical =
    (props.viewBoxHeight - mainViewBox.HEIGHT) / 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={props.svgWidth}
      height={props.svgHeight}
      viewBox={`0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`}
    >
      <defs>
        <symbol id="cross">
          <line x1="1" y1="1" x2={crossSize} y2="1" />
          <line x1="1" y1="1" x2="1" y2={crossSize} />
        </symbol>
      </defs>
      <g
        transform={`translate(${mainViewBoxMarginHorizontal},${mainViewBoxMarginVertical})`}
      >
        <g className="canvasCorners">
          <use xlinkHref="#cross" x="-2" y="-2" />
          <g transform={`translate(${mainViewBox.WIDTH + 2}, -2)`}>
            <use xlinkHref="#cross" transform="rotate(90)" />
          </g>
          <g
            transform={`translate(${mainViewBox.WIDTH + 2}, ${
              mainViewBox.HEIGHT + 2
            })`}
          >
            <use xlinkHref="#cross" transform="rotate(180)" />
          </g>
          <g transform={`translate(-2, ${mainViewBox.HEIGHT + 2})`}>
            <use xlinkHref="#cross" transform="rotate(270)" />
          </g>
        </g>
        {props.children}
      </g>
    </svg>
  );
};
