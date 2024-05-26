import { useAppContext } from "../state/context.tsx";
import { PageCubicBezier as UnconnectedPageCubicBezier } from "../components/PageCubicBezier.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  CUBIC_BEZIER_START_POINT,
  CUBIC_BEZIER_CONTROL_POINT_1,
  CUBIC_BEZIER_CONTROL_POINT_2,
  CUBIC_BEZIER_END_POINT,
} from "../constants/actions.ts";

export const PageCubicBezier: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const setCubicBezierStartPoint = (coord: Coordinate) =>
    dispatch({ type: CUBIC_BEZIER_START_POINT, payload: coord });

  const setCubicBezierControlPoint1 = (coord: Coordinate) =>
    dispatch({ type: CUBIC_BEZIER_CONTROL_POINT_1, payload: coord });

  const setCubicBezierControlPoint2 = (coord: Coordinate) =>
    dispatch({ type: CUBIC_BEZIER_CONTROL_POINT_2, payload: coord });

  const setCubicBezierEndPoint = (coord: Coordinate) =>
    dispatch({ type: CUBIC_BEZIER_END_POINT, payload: coord });

  return (
    <UnconnectedPageCubicBezier
      {...state.cubicBezier}
      setCubicBezierStartPoint={setCubicBezierStartPoint}
      setCubicBezierControlPoint1={setCubicBezierControlPoint1}
      setCubicBezierControlPoint2={setCubicBezierControlPoint2}
      setCubicBezierEndPoint={setCubicBezierEndPoint}
    />
  );
};
