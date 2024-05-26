import { type Coordinate } from '../../../utils/types';
import {
    CUBIC_BEZIER_START_POINT,
    CUBIC_BEZIER_CONTROL_POINT_1,
    CUBIC_BEZIER_CONTROL_POINT_2,
    CUBIC_BEZIER_END_POINT,
} from '../../../constants/actions';

export type CubicBezierActions =
    | { type: typeof CUBIC_BEZIER_START_POINT; payload: Coordinate }
    | { type: typeof CUBIC_BEZIER_CONTROL_POINT_1; payload: Coordinate }
    | { type: typeof CUBIC_BEZIER_CONTROL_POINT_2; payload: Coordinate }
    | { type: typeof CUBIC_BEZIER_END_POINT; payload: Coordinate };
