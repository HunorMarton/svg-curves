import { useAppContext } from "../state/context.tsx";
import { PageQuadraticBezier as UnconnectedPageQuadraticBezier } from "../components/PageQuadraticBezier.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  QUADRATIC_BEZIER_START_POINT,
  QUADRATIC_BEZIER_CONTROL_POINT,
  QUADRATIC_BEZIER_END_POINT,
} from "../constants/actions.ts";

export const PageQuadraticBezier: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const setQuadraticBezierStartPoint = (coord: Coordinate) =>
    dispatch({ type: QUADRATIC_BEZIER_START_POINT, payload: coord });

  const setQuadraticBezierControlPoint1 = (coord: Coordinate) =>
    dispatch({ type: QUADRATIC_BEZIER_CONTROL_POINT, payload: coord });

  const setQuadraticBezierEndPoint = (coord: Coordinate) =>
    dispatch({ type: QUADRATIC_BEZIER_END_POINT, payload: coord });

  return (
    <UnconnectedPageQuadraticBezier
      {...state.quadraticBezier}
      setQuadraticBezierStartPoint={setQuadraticBezierStartPoint}
      setQuadraticBezierControlPoint1={setQuadraticBezierControlPoint1}
      setQuadraticBezierEndPoint={setQuadraticBezierEndPoint}
    />
  );
};
