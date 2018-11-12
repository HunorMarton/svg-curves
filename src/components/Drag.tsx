import * as React from 'react';
import { merge, fromEvent } from 'rxjs';
import { map, concatMap, takeUntil } from 'rxjs/operators';
import { Coordinate } from '../utils/types';
import { round } from '../utils/round';
import './Drag.css';

interface IProps {
  children: React.ReactNode;
  x: number;
  y: number;
  zoom: number;
  changeCoord: (coord: Coordinate) => void;
  desc?: string;
}

interface IState {
  dragging: boolean;
}

export class Drag extends React.Component<IProps, IState> {
  public readonly state: IState = {
    dragging: false,
  };

  public size = 40;

  public draggable: SVGElement;

  public componentDidMount() {
    const mouseEventToCoordinate = (mouseEvent: React.MouseEvent) => ({
      x: mouseEvent.clientX,
      y: mouseEvent.clientY,
    });
    const touchEventToCoordinate = (touchEvent: React.TouchEvent) => {
      touchEvent.preventDefault();
      return {
        x: touchEvent.touches[0].clientX,
        y: touchEvent.touches[0].clientY,
      };
    };

    // Event handling using Reactive JS
    const mouseDowns = fromEvent<React.MouseEvent>(this.draggable, 'mousedown').pipe(
      map(mouseEventToCoordinate)
    );
    const mouseMoves = fromEvent<React.MouseEvent>(window, 'mousemove').pipe(
      map(mouseEventToCoordinate)
    );
    const mouseUps = fromEvent<React.MouseEvent>(window, 'mouseup');

    const touchStarts = fromEvent<React.TouchEvent>(this.draggable, 'touchstart').pipe(
      map(touchEventToCoordinate)
    );
    const touchMoves = fromEvent<React.TouchEvent>(this.draggable, 'touchmove').pipe(
      map(touchEventToCoordinate)
    );
    const touchEnds = fromEvent<React.TouchEvent>(window, 'touchend');

    const dragStarts = merge(mouseDowns, touchStarts);
    const moves = merge(mouseMoves, touchMoves);
    const dragEnds = merge(mouseUps, touchEnds);

    const drags = dragStarts.pipe(
      concatMap(dragStartEvent => {
        const xDelta = this.props.x - dragStartEvent.x * this.props.zoom;
        const yDelta = this.props.y - dragStartEvent.y * this.props.zoom;
        return moves.pipe(
          takeUntil(dragEnds),
          map(dragEvent => {
            const x = dragEvent.x * this.props.zoom + xDelta;
            const y = dragEvent.y * this.props.zoom + yDelta;
            return { x, y };
          })
        );
      })
    );

    dragStarts.forEach(() => {
      this.setState({ dragging: true });
    });

    drags.forEach(coordinate => {
      this.props.changeCoord({ x: coordinate.x, y: coordinate.y });
    });

    dragEnds.forEach(() => {
      this.setState({ dragging: false });
    });
  }

  public render() {
    return (
      <g
        className={this.state.dragging ? 'dragging' : 'draggable'}
        ref={(draggable: SVGGElement) => {
          this.draggable = draggable;
        }}
        transform={`translate(${this.props.x},${this.props.y})`}
      >
        <circle x={-this.size / 2} y={-this.size / 2} r={this.size / 2} />
        {this.props.children}
        <text x={this.size / 2} y={-this.size / 2} textAnchor="left" stroke="none">
          {this.props.desc
            ? this.props.desc
            : `${round(this.props.x)}, ${round(this.props.y)}`}
        </text>
      </g>
    );
  }
}
