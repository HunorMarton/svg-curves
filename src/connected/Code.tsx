import { type ReactNode } from "react";
import { useAppContext } from "../state/context.tsx";
import { Code as UnconnectedCode } from "../components/Code.tsx";

export const Code: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state } = useAppContext();

  return (
    <UnconnectedCode width={state.canvas.svgWidth}>{children}</UnconnectedCode>
  );
};
