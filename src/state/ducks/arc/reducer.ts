import { type Arc } from '../../../utils/types';
import { round100 as round } from '../../../utils/round';
import overrideCoord from '../../../utils/overrideCoord';
import * as arcUtil from '../../../utils/arcUtil';
import { type Action } from '../../reducers';

import {
    ARC_START_POINT,
    ARC_CENTER_POINT,
    ARC_END_POINT,
    ARC_RADIUS_X,
    ARC_RADIUS_Y,
    ARC_ROTATION,
    ARC_FLAGS,
} from '../../../constants/actions';

export type State = Readonly<Arc>;

export default function arcReducer(
    state: State,
    action: Action,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
) {
    switch (action.type) {
        case ARC_START_POINT: {
            const { x: x1, y: y1 } = overrideCoord({
                x: action.payload.x,
                y: action.payload.y,
                minX,
                minY,
                maxX,
                maxY,
            });
            const { cx, cy } = arcUtil.calculateArcCenter(
                Object.assign({}, state, {
                    x1,
                    y1,
                })
            );
            const {
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            } = arcUtil.calculateDrags({
                cx,
                cy,
                rx: state.rx,
                ry: state.ry,
                radian: state.radian,
            });
            return {
                ...state,
                x1,
                y1,
                cx,
                cy,
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            };
        }
        case ARC_END_POINT: {
            const { x: x2, y: y2 } = overrideCoord({
                x: action.payload.x,
                y: action.payload.y,
                minX,
                minY,
                maxX,
                maxY,
            });
            const { cx, cy } = arcUtil.calculateArcCenter(
                Object.assign({}, state, {
                    x2,
                    y2,
                })
            );
            const {
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            } = arcUtil.calculateDrags({
                cx,
                cy,
                rx: state.rx,
                ry: state.ry,
                radian: state.radian,
            });
            return {
                ...state,
                x2,
                y2,
                cx,
                cy,
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            };
        }
        case ARC_CENTER_POINT: {
            const { x: cx, y: cy } = overrideCoord({
                x: action.payload.x,
                y: action.payload.y,
                minX,
                minY,
                maxX,
                maxY,
            });
            const deltaX = state.cx - cx;
            const deltaY = state.cy - cy;
            return {
                ...state,
                x1: state.x1 - deltaX,
                y1: state.y1 - deltaY,
                x2: state.x2 - deltaX,
                y2: state.y2 - deltaY,
                rxDragX: state.rxDragX - deltaX,
                rxDragY: state.rxDragY - deltaY,
                ryDragX: state.ryDragX - deltaX,
                ryDragY: state.ryDragY - deltaY,
                angleDragX: state.angleDragX - deltaX,
                angleDragY: state.angleDragY - deltaY,
                cx,
                cy,
            };
        }
        case ARC_ROTATION: {
            const radian = arcUtil.calculateAngle({
                x1: state.cx,
                y1: state.cy,
                x2: action.payload.x,
                y2: action.payload.y,
            });
            const degree = round((radian * 180) / Math.PI);

            const { θ1, θ2 } = arcUtil.calculateArcPointAngles({
                x1: state.x1,
                y1: state.y1,
                x2: state.x2,
                y2: state.y2,
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry: state.ry,
                radian,
            });
            const { x1, y1, x2, y2 } = arcUtil.calculateArcPoints({
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry: state.ry,
                radian,
                θ1,
                θ2,
            });

            const {
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            } = arcUtil.calculateDrags({
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry: state.ry,
                radian,
            });
            return {
                ...state,
                radian,
                degree,
                x1,
                y1,
                x2,
                y2,
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            };
        }
        case ARC_RADIUS_X: {
            const { θ1, θ2 } = arcUtil.calculateArcPointAngles({
                x1: state.x1,
                y1: state.y1,
                x2: state.x2,
                y2: state.y2,
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry: state.ry,
                radian: state.radian,
            });
            const rx = arcUtil.calculateDistance({
                x1: state.cx,
                y1: state.cy,
                x2: action.payload.x,
                y2: action.payload.y,
            });
            const { x1, y1, x2, y2 } = arcUtil.calculateArcPoints({
                cx: state.cx,
                cy: state.cy,
                rx,
                ry: state.ry,
                radian: state.radian,
                θ1,
                θ2,
            });
            const {
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            } = arcUtil.calculateDrags({
                cx: state.cx,
                cy: state.cy,
                rx,
                ry: state.ry,
                radian: state.radian,
            });
            return {
                ...state,
                rx,
                x1,
                y1,
                x2,
                y2,
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            };
        }
        case ARC_RADIUS_Y: {
            const { θ1, θ2 } = arcUtil.calculateArcPointAngles({
                x1: state.x1,
                y1: state.y1,
                x2: state.x2,
                y2: state.y2,
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry: state.ry,
                radian: state.radian,
            });
            const ry = arcUtil.calculateDistance({
                x1: state.cx,
                y1: state.cy,
                x2: action.payload.x,
                y2: action.payload.y,
            });
            const { x1, y1, x2, y2 } = arcUtil.calculateArcPoints({
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry,
                radian: state.radian,
                θ1,
                θ2,
            });
            const {
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            } = arcUtil.calculateDrags({
                cx: state.cx,
                cy: state.cy,
                rx: state.rx,
                ry,
                radian: state.radian,
            });
            return {
                ...state,
                ry,
                x1,
                y1,
                x2,
                y2,
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            };
        }
        case ARC_FLAGS: {
            const { cx, cy } = arcUtil.calculateArcCenter(
                Object.assign({}, state, {
                    largeArcFlag: action.payload.largeArcFlag,
                    sweepFlag: action.payload.sweepFlag,
                })
            );
            const {
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            } = arcUtil.calculateDrags({
                cx,
                cy,
                rx: state.rx,
                ry: state.ry,
                radian: state.radian,
            });
            return {
                ...state,
                largeArcFlag: action.payload.largeArcFlag,
                sweepFlag: action.payload.sweepFlag,
                cx,
                cy,
                rxDragX,
                rxDragY,
                ryDragX,
                ryDragY,
                angleDragX,
                angleDragY,
            };
        }
        default:
            return state;
    }
}
