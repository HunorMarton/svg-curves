import { action } from 'typesafe-actions';
import { Coordinate } from '../../../utils/types';
import {
  QUADRATIC_BEZIER_START_POINT,
  QUADRATIC_BEZIER_CONTROL_POINT,
  QUADRATIC_BEZIER_END_POINT,
} from '../../../constants/actions';

export const setQuadraticBezierStartPoint = (coord: Coordinate) =>
  action(QUADRATIC_BEZIER_START_POINT, coord);

export const setQuadraticBezierControlPoint1 = (coord: Coordinate) =>
  action(QUADRATIC_BEZIER_CONTROL_POINT, coord);

export const setQuadraticBezierEndPoint = (coord: Coordinate) =>
  action(QUADRATIC_BEZIER_END_POINT, coord);
