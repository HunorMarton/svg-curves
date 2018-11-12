import { QuadraticBezier } from '../../../utils/types';
import overrideCoord from '../../../utils/overrideCoord';
import { Action } from '../../reducers';

import {
  QUADRATIC_BEZIER_START_POINT,
  QUADRATIC_BEZIER_CONTROL_POINT,
  QUADRATIC_BEZIER_END_POINT,
} from '../../../constants/actions';

export type State = Readonly<QuadraticBezier>;

export default function quadraticBezierReducer(
  state: State,
  action: Action,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
) {
  switch (action.type) {
    case QUADRATIC_BEZIER_START_POINT: {
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
    case QUADRATIC_BEZIER_CONTROL_POINT: {
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
    case QUADRATIC_BEZIER_END_POINT: {
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
