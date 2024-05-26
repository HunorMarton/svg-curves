import { useAppContext } from "../state/context.tsx";
import { PageArc as UnconnectedPageArc } from "../components/PageArc.tsx";
import { type Coordinate } from "../utils/types.ts";
import {
  ARC_START_POINT,
  ARC_CENTER_POINT,
  ARC_END_POINT,
  ARC_RADIUS_X,
  ARC_RADIUS_Y,
  ARC_ROTATION,
  ARC_FLAGS,
} from "../constants/actions.ts";

export const PageArc: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const setArcStartPoint = (coord: Coordinate) =>
    dispatch({ type: ARC_START_POINT, payload: coord });

  const setArcCenterPoint = (coord: Coordinate) =>
    dispatch({ type: ARC_CENTER_POINT, payload: coord });

  const setArcEndPoint = (coord: Coordinate) =>
    dispatch({ type: ARC_END_POINT, payload: coord });

  const setArcRadiusX = (coord: Coordinate) =>
    dispatch({ type: ARC_RADIUS_X, payload: coord });

  const setArcRadiusY = (coord: Coordinate) =>
    dispatch({ type: ARC_RADIUS_Y, payload: coord });

  const setArcRotation = (coord: Coordinate) =>
    dispatch({ type: ARC_ROTATION, payload: coord });

  const setArcFlags = ({
    largeArcFlag,
    sweepFlag,
  }: {
    largeArcFlag: boolean;
    sweepFlag: boolean;
  }) => dispatch({ type: ARC_FLAGS, payload: { largeArcFlag, sweepFlag } });

  return (
    <UnconnectedPageArc
      {...state.arc}
      setArcStartPoint={setArcStartPoint}
      setArcCenterPoint={setArcCenterPoint}
      setArcEndPoint={setArcEndPoint}
      setArcRadiusX={setArcRadiusX}
      setArcRadiusY={setArcRadiusY}
      setArcRotation={setArcRotation}
      setArcFlags={setArcFlags}
    />
  );
};
