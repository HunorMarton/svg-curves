import { useAppContext } from "../state/context.tsx";
import { type Coordinate } from "../utils/types";
import { Drag as UnconnectedDrag } from "../components/Drag.tsx";

interface DragProps {
  children: React.ReactNode;
  x: number;
  y: number;
  changeCoord: (coord: Coordinate) => void;
  desc?: string;
}

export const Drag: React.FC<DragProps> = (props) => {
  const { state } = useAppContext();

  return <UnconnectedDrag {...props} zoom={state.canvas.zoom} />;
};
