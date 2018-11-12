import * as React from 'react';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mainViewBox from '../constants/mainViewBoxSize';
import './Canvas.css';

interface IProps {
  children: React.ReactNode;
  svgWidth: number;
  svgHeight: number;
  viewBoxWidth: number;
  viewBoxHeight: number;
  resize: ({ width, height }: { width: number; height: number }) => void;
}

export class Canvas extends React.Component<IProps> {
  public componentDidMount() {
    fromEvent(window, 'resize')
      .pipe(
        map(() => ({
          width: window.innerWidth,
          height: window.innerHeight,
        }))
      )
      .subscribe(({ width, height }) => {
        this.props.resize({ width, height });
      });
  }

  public render() {
    const crossSize = 20;
    const mainViewBoxMarginHorizontal = (this.props.viewBoxWidth - mainViewBox.WIDTH) / 2;
    const mainViewBoxMarginVertical = (this.props.viewBoxHeight - mainViewBox.HEIGHT) / 2;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={this.props.svgWidth}
        height={this.props.svgHeight}
        viewBox={`0 0 ${this.props.viewBoxWidth} ${this.props.viewBoxHeight}`}
      >
        <defs>
          <symbol id="cross">
            <line x1="1" y1="1" x2={crossSize} y2="1" />
            <line x1="1" y1="1" x2="1" y2={crossSize} />
          </symbol>
        </defs>
        <g
          transform={`translate(${mainViewBoxMarginHorizontal},${mainViewBoxMarginVertical})`}
        >
          <g className="canvasCorners">
            <use xlinkHref="#cross" x="-2" y="-2" />
            <g transform={`translate(${mainViewBox.WIDTH + 2}, -2)`}>
              <use xlinkHref="#cross" transform="rotate(90)" />
            </g>
            <g
              transform={`translate(${mainViewBox.WIDTH + 2}, ${mainViewBox.HEIGHT + 2})`}
            >
              <use xlinkHref="#cross" transform="rotate(180)" />
            </g>
            <g transform={`translate(-2, ${mainViewBox.HEIGHT + 2})`}>
              <use xlinkHref="#cross" transform="rotate(270)" />
            </g>
          </g>
          {this.props.children}
        </g>
      </svg>
    );
  }
}
