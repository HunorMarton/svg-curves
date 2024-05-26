import { type Coordinate } from '../../../utils/types';
import {
    QUADRATIC_BEZIER_START_POINT,
    QUADRATIC_BEZIER_CONTROL_POINT,
    QUADRATIC_BEZIER_END_POINT,
} from '../../../constants/actions';

export type QuadraticBezierActions =
    | { type: typeof QUADRATIC_BEZIER_START_POINT; payload: Coordinate }
    | { type: typeof QUADRATIC_BEZIER_CONTROL_POINT; payload: Coordinate }
    | { type: typeof QUADRATIC_BEZIER_END_POINT; payload: Coordinate };