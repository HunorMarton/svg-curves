import React, { type ReactNode } from "react";
import { Canvas as UnconnectedCanvas } from "../components/Canvas.tsx";
import { useAppContext } from "../state/context.tsx";
import { RESIZE } from "../constants/actions.ts";

export const Canvas: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAppContext();

  const resize = ({ width, height }: { width: number; height: number }) =>
    dispatch({ type: RESIZE, payload: { width, height } });

  return (
    <UnconnectedCanvas
      svgWidth={state.canvas.svgWidth}
      svgHeight={state.canvas.svgHeight}
      viewBoxWidth={state.canvas.viewBoxWidth}
      viewBoxHeight={state.canvas.viewBoxHeight}
      resize={resize}
    >
      {children}
    </UnconnectedCanvas>
  );
};
