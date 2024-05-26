import { round100 as round } from './round';
import { ROTATION_DRAG_HANDLE } from '../constants/dragSize';

/* tslint:disable:variable-name */

// Explaining how the arc center is calculated (SVG Arc implementation notes):
// https://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes

export function calculateArcCenter({
    x1,
    y1,
    x2,
    y2,
    largeArcFlag,
    sweepFlag,
    rx: initialRx,
    ry: initialRy,
    radian,
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    largeArcFlag: boolean;
    sweepFlag: boolean;
    rx: number;
    ry: number;
    radian: number;
}) {
    let rx = initialRx;
    let ry = initialRy;

    const matrix = [
        [Math.cos(radian), Math.sin(radian)],
        [-Math.sin(radian), Math.cos(radian)],
    ];
    const middleX = (x1 - x2) / 2;
    const middleY = (y1 - y2) / 2;

    // Step 1: Compute x_, y_
    const x_ = matrix[0][0] * middleX + matrix[0][1] * middleY;
    const y_ = matrix[1][0] * middleX + matrix[1][1] * middleY;

    // Step 2: Compute cx_, cx_
    const sign = largeArcFlag === sweepFlag ? -1 : 1;
    let c_multiplier_base = rx * rx * ry * ry - rx * rx * y_ * y_ - ry * ry * x_ * x_;
    while (c_multiplier_base < 0) {
        // If rx, ry and φ are such that there is no solution (basically, the ellipse is not big enough to reach from (x1, y1) to (x2, y2)) then the ellipse is scaled up uniformly until there is exactly one solution (until the ellipse is just big enough).
        const radiusRatio = ry / rx;
        rx += 0.1;
        ry = rx * radiusRatio;
        c_multiplier_base = rx * rx * ry * ry - rx * rx * y_ * y_ - ry * ry * x_ * x_;
    }
    const c_multiplier =
        sign * Math.sqrt(c_multiplier_base / (rx * rx * y_ * y_ + ry * ry * x_ * x_));
    const cx_ = (c_multiplier * rx * y_) / ry;
    const cy_ = (c_multiplier * -1 * ry * x_) / rx;

    // Step 3: Compute cx, cy from cx_, cy_
    const cx = matrix[1][1] * cx_ + matrix[1][0] * cy_ + middleX;
    const cy = matrix[0][1] * cx_ + matrix[0][0] * cy_ + middleY;

    return {
        cx: round(cx + x2),
        cy: round(cy + y2),
    };
}

export function calculateArcPoints({
    cx,
    cy,
    rx,
    ry,
    radian,
    θ1,
    θ2,
}: {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    radian: number;
    θ1: number;
    θ2: number;
}) {
    const matrix = [
        [Math.cos(radian), -Math.sin(radian)],
        [Math.sin(radian), Math.cos(radian)],
    ];

    // debugger;
    const x1 = matrix[0][0] * rx * Math.cos(θ1) + matrix[0][1] * ry * Math.sin(θ1) + cx;
    const y1 = matrix[1][0] * rx * Math.cos(θ1) + matrix[1][1] * ry * Math.sin(θ1) + cy;
    const x2 = matrix[0][0] * rx * Math.cos(θ2) + matrix[0][1] * ry * Math.sin(θ2) + cx;
    const y2 = matrix[1][0] * rx * Math.cos(θ2) + matrix[1][1] * ry * Math.sin(θ2) + cy;
    const Δθ = θ2 - θ1;
    const largeArcFlag = Math.abs(Δθ) > Math.PI ? true : false;
    const sweepFlag = Δθ > 0 ? true : false;
    return {
        x1: round(x1),
        y1: round(y1),
        x2: round(x2),
        y2: round(y2),
        largeArcFlag,
        sweepFlag,
    };
}

export function calculateArcPointAngles({
    x1,
    y1,
    x2,
    y2,
    cx,
    cy,
    rx,
    ry,
    radian,
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    radian: number;
}) {
    // θ is the angle from the x-axis of the current coordinate system to the x-axis of the ellipse.
    // θ ranges from:
    // - θ1 which is the start angle of the elliptical arc prior to the stretch and rotate operations.
    // - θ2 which is the end angle of the elliptical arc prior to the stretch and rotate operations.
    // - Δθ which is the difference between these two angles.

    // Step 1: Put the center of the ellipse to the origo
    const Δx1 = x1 - cx;
    const Δy1 = y1 - cy;
    const Δx2 = x2 - cx;
    const Δy2 = y2 - cy;

    // Step 2: Rotate back ellipse to the X-axis
    const x1_ = Δx1 * Math.cos(radian) + Δy1 * Math.sin(radian);
    const y1_ = Δy1 * Math.cos(radian) - Δx1 * Math.sin(radian);
    const x2_ = Δx2 * Math.cos(radian) + Δy2 * Math.sin(radian);
    const y2_ = Δy2 * Math.cos(radian) - Δx2 * Math.sin(radian);

    // Step 3: Un-stretch ellipse to a 1x1 circle
    const x1__ = x1_ / rx;
    const y1__ = y1_ / ry;
    const x2__ = x2_ / rx;
    const y2__ = y2_ / ry;

    // Step 4: Calculate angles of the points
    const θ1 = calculateAngle({ x1: 0, y1: 0, x2: x1__, y2: y1__ });
    const θ2 = calculateAngle({ x1: 0, y1: 0, x2: x2__, y2: y2__ });

    return { θ1, θ2 };
}

export function calculateDrags({
    cx,
    cy,
    rx,
    ry,
    radian,
}: {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    radian: number;
}) {
    return {
        rxDragX: round(cx + rx * Math.cos(radian)),
        rxDragY: round(cy + rx * Math.sin(radian)),
        ryDragX: round(cx + ry * Math.cos(radian - (90 / 180) * Math.PI)),
        ryDragY: round(cy + ry * Math.sin(radian - (90 / 180) * Math.PI)),
        angleDragX: round(cx + Math.cos(radian) * ROTATION_DRAG_HANDLE),
        angleDragY: round(cy + Math.sin(radian) * ROTATION_DRAG_HANDLE),
    };
}

export function calculateAngle({
    x1,
    y1,
    x2,
    y2,
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}) {
    const horizontalLeg = x2 - x1;
    const verticalLeg = y2 - y1;
    const hypotenuse = Math.sqrt(Math.pow(verticalLeg, 2) + Math.pow(horizontalLeg, 2));
    // const radian = horizontalLeg > 0 ? Math.asin(verticalLeg / hypotenuse) : - Math.asin(verticalLeg / hypotenuse) + Math.PI; // -90 270
    const radian =
        verticalLeg > 0
            ? Math.acos(horizontalLeg / hypotenuse)
            : Math.PI - Math.acos(horizontalLeg / hypotenuse) + Math.PI; // 0 360
    return radian;
}

export function calculateDistance({
    x1,
    y1,
    x2,
    y2,
}: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}) {
    const horizontalLeg = x2 - x1;
    const verticalLeg = y2 - y1;
    const hypotenuse = Math.sqrt(Math.pow(verticalLeg, 2) + Math.pow(horizontalLeg, 2));
    return hypotenuse;
}

// OTHER links in the topic:

// How to calculate center of an ellipse by two points and radius sizes
// http://stackoverflow.com/questions/197649/how-to-calculate-center-of-an-ellipse-by-two-points-and-radius-sizes

// What is the general equation of the ellipse that is not in the origin and rotated by an angle?
// http://math.stackexchange.com/questions/426150/what-is-the-general-equation-of-the-ellipse-that-is-not-in-the-origin-and-rotate

// What's the parametric equation for the general form of an ellipse rotated by any amount?
// http://math.stackexchange.com/questions/941490/whats-the-parametric-equation-for-the-general-form-of-an-ellipse-rotated-by-any

// Trigonometric Identities
// http://www.purplemath.com/modules/idents.htm

// Ellipse
// https://en.wikipedia.org/wiki/Ellipse
