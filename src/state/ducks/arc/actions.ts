import { type Coordinate } from '../../../utils/types';
import {
    ARC_START_POINT,
    ARC_CENTER_POINT,
    ARC_END_POINT,
    ARC_RADIUS_X,
    ARC_RADIUS_Y,
    ARC_ROTATION,
    ARC_FLAGS,
} from '../../../constants/actions';

export type ArcActions =
    | { type: typeof ARC_START_POINT; payload: Coordinate }
    | { type: typeof ARC_CENTER_POINT; payload: Coordinate }
    | { type: typeof ARC_END_POINT; payload: Coordinate }
    | { type: typeof ARC_RADIUS_X; payload: Coordinate }
    | { type: typeof ARC_RADIUS_Y; payload: Coordinate }
    | { type: typeof ARC_ROTATION; payload: Coordinate }
    | { type: typeof ARC_FLAGS; payload: { largeArcFlag: boolean; sweepFlag: boolean } };
