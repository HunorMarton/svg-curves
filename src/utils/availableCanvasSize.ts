const HEADER_HEIGHT = 60;
const CODE_HEIGHT = 150;

export function calculateAvailableCanvasSizeFromScreenSize(
  width: number,
  height: number
) {
  return {
    width,
    height: height - HEADER_HEIGHT - CODE_HEIGHT,
  };
}

export function calculateScreenSizeFromAvailableCanvasSize(
  width: number,
  height: number
) {
  return {
    width,
    height: height + HEADER_HEIGHT + CODE_HEIGHT,
  };
}
