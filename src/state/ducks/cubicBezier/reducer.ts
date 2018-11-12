import { CubicBezier } from '../../../utils/types';
import overrideCoord from '../../../utils/overrideCoord';
import { Action } from '../../reducers';

import {
  CUBIC_BEZIER_START_POINT,
  CUBIC_BEZIER_CONTROL_POINT_1,
  CUBIC_BEZIER_CONTROL_POINT_2,
  CUBIC_BEZIER_END_POINT,
} from '../../../constants/actions';

export type State = Readonly<CubicBezier>;

export default function cubicBezierReducer(
  state: State,
  action: Action,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
) {
  switch (action.type) {
    case CUBIC_BEZIER_START_POINT: {
      const { x: x0, y: y0 } = overrideCoord({
        x: action.payload.x,
        y: action.payload.y,
        minX,
        minY,
        maxX,
        maxY,
      });
      return { ...state, x0, y0 };
    }
    case CUBIC_BEZIER_CONTROL_POINT_1: {
      const { x: x1, y: y1 } = overrideCoord({
        x: action.payload.x,
        y: action.payload.y,
        minX,
        minY,
        maxX,
        maxY,
      });
      return { ...state, x1, y1 };
    }
    case CUBIC_BEZIER_CONTROL_POINT_2: {
      const { x: x2, y: y2 } = overrideCoord({
        x: action.payload.x,
        y: action.payload.y,
        minX,
        minY,
        maxX,
        maxY,
      });
      return { ...state, x2, y2 };
    }
    case CUBIC_BEZIER_END_POINT: {
      const { x, y } = overrideCoord({
        x: action.payload.x,
        y: action.payload.y,
        minX,
        minY,
        maxX,
        maxY,
      });
      return { ...state, x, y };
    }
    default:
      return state;
  }
}
