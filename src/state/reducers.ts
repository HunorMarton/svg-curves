import * as mainViewBox from '../constants/mainViewBoxSize';

import canvasReducer, { type State as CanvasState } from './ducks/canvas/reducer';
import { type CanvasActions } from './ducks/canvas/actions';

import arcReducer, { type State as ArcState } from './ducks/arc/reducer';
import { type ArcActions } from './ducks/arc/actions';

import cubicBezierReducer, { type State as CubicBezierState } from './ducks/cubicBezier/reducer';
import { type CubicBezierActions } from './ducks/cubicBezier/actions';

import quadraticBezierReducer, { type State as QuadraticBezierState } from './ducks/quadraticBezier/reducer';
import { type QuadraticBezierActions } from './ducks/quadraticBezier/actions';


export type State = {
    readonly canvas: CanvasState;
    readonly arc: ArcState;
    readonly cubicBezier: CubicBezierState;
    readonly quadraticBezier: QuadraticBezierState;
};

export type Action =
    | CanvasActions
    | ArcActions
    | CubicBezierActions
    | QuadraticBezierActions;

export default function rootReducer(state: State, action: Action) {
    const canvas = canvasReducer(
        state.canvas,
        action,
        mainViewBox.WIDTH,
        mainViewBox.HEIGHT
    );

    const horizontalMargin = (canvas.viewBoxWidth - mainViewBox.WIDTH) / 2;
    const verticalMargin = (canvas.viewBoxHeight - mainViewBox.HEIGHT) / 2;
    const minX = -horizontalMargin;
    const maxX = horizontalMargin + mainViewBox.WIDTH;
    const minY = -verticalMargin;
    const maxY = verticalMargin + mainViewBox.HEIGHT;

    const cubicBezier = cubicBezierReducer(
        state.cubicBezier,
        action,
        minX,
        minY,
        maxX,
        maxY
    );
    const quadraticBezier = quadraticBezierReducer(
        state.quadraticBezier,
        action,
        minX,
        minY,
        maxX,
        maxY
    );
    const arc = arcReducer(state.arc, action, minX, minY, maxX, maxY);

    return {
        canvas,
        arc,
        cubicBezier,
        quadraticBezier,
    };
}
