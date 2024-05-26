import { RESIZE } from '../../../constants/actions';

export type CanvasActions =
    | { type: typeof RESIZE; payload: { width: number; height: number } };
