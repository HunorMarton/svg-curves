export default {
    canvas: {
        zoom: 1, // Changes if screen size goes below mainViewBox size
        svgWidth: 500, // Moves with resize
        svgHeight: 500,
        viewBoxWidth: 500, // Grows if the screen size goes above mainViewBox size
        viewBoxHeight: 500,
    },

    cubicBezier: {
        x0: 100,
        y0: 350,
        x1: 70,
        y1: 100,
        x2: 380,
        y2: 100,
        x: 350,
        y: 350,
    },
    quadraticBezier: {
        x0: 100,
        y0: 350,
        x1: 225,
        y1: 50,
        x: 350,
        y: 350,
    },
    arc: {
        x1: 145,
        y1: 174,
        x2: 288,
        y2: 314,
        largeArcFlag: false,
        sweepFlag: false,
        rx: 150,
        ry: 120,
        degree: 20,
        // Helpers
        radian: 0.34906585,
        rxDragX: 0,
        rxDragY: 0,
        ryDragX: 0,
        ryDragY: 0,
        angleDragX: 0,
        angleDragY: 0,
        cx: 292,
        cy: 192,
    },
};
