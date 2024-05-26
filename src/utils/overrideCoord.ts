import { round100 as round } from './round';

export default function overrideCoord({
    x,
    y,
    minX,
    minY,
    maxX,
    maxY,
}: {
    x: number;
    y: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}) {
    let X = Math.min(x, maxX);
    let Y = Math.min(y, maxY);
    X = Math.max(X, minX);
    Y = Math.max(Y, minY);
    X = round(X);
    Y = round(Y);
    return { x: X, y: Y };
}
