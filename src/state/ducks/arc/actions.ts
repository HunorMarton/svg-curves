import { action } from 'typesafe-actions';
import { Coordinate } from '../../../utils/types';
import {
  ARC_START_POINT,
  ARC_CENTER_POINT,
  ARC_END_POINT,
  ARC_RADIUS_X,
  ARC_RADIUS_Y,
  ARC_ROTATION,
  ARC_FLAGS,
} from '../../../constants/actions';

export const setArcStartPoint = (coord: Coordinate) => action(ARC_START_POINT, coord);

export const setArcCenterPoint = (coord: Coordinate) => action(ARC_CENTER_POINT, coord);

export const setArcEndPoint = (coord: Coordinate) => action(ARC_END_POINT, coord);

export const setArcRadiusX = (coord: Coordinate) => action(ARC_RADIUS_X, coord);

export const setArcRadiusY = (coord: Coordinate) => action(ARC_RADIUS_Y, coord);

export const setArcRotation = (coord: Coordinate) => action(ARC_ROTATION, coord);

export const setArcFlags = ({
  largeArcFlag,
  sweepFlag,
}: {
  largeArcFlag: boolean;
  sweepFlag: boolean;
}) => action(ARC_FLAGS, { largeArcFlag, sweepFlag });
