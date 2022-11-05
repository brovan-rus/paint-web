import {Coordinate} from "./Coordinate";

export type Draw = (props: {
    context: CanvasRenderingContext2D,
    frameCount?: number,
    canvas?: HTMLCanvasElement,
    originalMousePosition?: Coordinate,
    newMousePosition?: Coordinate
    isPainting?: boolean,
}) => any ;

export type Fill = (props: {
    context: CanvasRenderingContext2D,
    originalMousePosition?: Coordinate,
    canvas: HTMLCanvasElement,
}) => any;
