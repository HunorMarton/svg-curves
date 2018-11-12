import { StateType, ActionType } from 'typesafe-actions';
import { Reducer } from 'redux';
import { History } from 'history';
import { RouterState, RouterAction, connectRouter } from 'connected-react-router';
import * as mainViewBox from '../constants/mainViewBoxSize';
import canvasReducer from './ducks/canvas/reducer';
import * as canvasActions from './ducks/canvas/actions';
import arcReducer from './ducks/arc/reducer';
import * as arcActions from './ducks/arc/actions';
import cubicBezierReducer from './ducks/cubicBezier/reducer';
import * as cubicBezierActions from './ducks/cubicBezier/actions';
import quadraticBezierReducer from './ducks/quadraticBezier/reducer';
import * as quadraticBezierActions from './ducks/quadraticBezier/actions';
import initialState from './initialState';

export type State = {
  readonly canvas: StateType<typeof canvasReducer>;
  readonly arc: StateType<typeof arcReducer>;
  readonly cubicBezier: StateType<typeof cubicBezierReducer>;
  readonly quadraticBezier: StateType<typeof quadraticBezierReducer>;
  readonly router: RouterState;
};

export type Action =
  | ActionType<typeof canvasActions>
  | ActionType<typeof arcActions>
  | ActionType<typeof cubicBezierActions>
  | ActionType<typeof quadraticBezierActions>
  | RouterAction;

export default function rootReducer(history: History) {
  const routerReducer: Reducer = connectRouter(history);

  return (
    state: State = {
      ...initialState,
      router: { location: history.location, action: history.action },
    },
    action: Action
  ) => {
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

    const router = routerReducer(state.router, action);

    return {
      canvas,
      arc,
      cubicBezier,
      quadraticBezier,
      router,
    };
  };
}
