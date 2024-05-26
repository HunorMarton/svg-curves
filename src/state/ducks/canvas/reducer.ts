import { type Canvas } from '../../../utils/types';
import * as mainViewBox from '../../../constants/mainViewBoxSize';
import { calculateAvailableCanvasSizeFromScreenSize } from '../../../utils/availableCanvasSize';
import { type Action } from '../../reducers';

import { RESIZE } from '../../../constants/actions';

export type State = Readonly<Canvas>;

export default function coordReducer(
    state: State,
    action: Action,
    minWidth: number,
    minHeight: number
) {
    switch (action.type) {
        case RESIZE: {
            const availableSize = calculateAvailableCanvasSizeFromScreenSize(
                action.payload.width,
                action.payload.height
            );

            // Shrink everything if needed
            let zoom: number;
            if (availableSize.width < minWidth || availableSize.height < minHeight) {
                zoom =
                    availableSize.width < availableSize.height
                        ? minWidth / availableSize.width
                        : minHeight / availableSize.height;
            } else {
                zoom = 1;
            }

            // If the available space is quite close to the main viewBox size than make it main viewBox size
            if (
                availableSize.width < (mainViewBox.WIDTH / zoom) * 1.05 &&
                availableSize.height < (mainViewBox.HEIGHT / zoom) * 1.05
            ) {
                availableSize.width = mainViewBox.WIDTH / zoom;
                availableSize.height = mainViewBox.HEIGHT / zoom;
            }

            return {
                zoom,
                svgWidth: availableSize.width,
                svgHeight: availableSize.height,
                viewBoxWidth: availableSize.width * zoom,
                viewBoxHeight: availableSize.height * zoom,
            };
        }
        default:
            return state;
    }
}
