import { action } from 'typesafe-actions';
import { Coordinate } from '../../../utils/types';
import {
  CUBIC_BEZIER_START_POINT,
  CUBIC_BEZIER_CONTROL_POINT_1,
  CUBIC_BEZIER_CONTROL_POINT_2,
  CUBIC_BEZIER_END_POINT,
} from '../../../constants/actions';

export const setCubicBezierStartPoint = (coord: Coordinate) =>
  action(CUBIC_BEZIER_START_POINT, coord);

export const setCubicBezierControlPoint1 = (coord: Coordinate) =>
  action(CUBIC_BEZIER_CONTROL_POINT_1, coord);

export const setCubicBezierControlPoint2 = (coord: Coordinate) =>
  action(CUBIC_BEZIER_CONTROL_POINT_2, coord);

export const setCubicBezierEndPoint = (coord: Coordinate) =>
  action(CUBIC_BEZIER_END_POINT, coord);
