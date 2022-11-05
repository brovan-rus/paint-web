import {Coordinate} from "../types/Coordinate";
import {RefObject} from "react";

export const getCoordinates = (event: MouseEvent, canvasRef: RefObject<HTMLCanvasElement>): Coordinate | undefined => {
    if (!canvasRef.current) {
        return
    }
    const canvas = canvasRef.current;
    return {x: event.offsetX - canvas.offsetLeft, y: event.offsetY - canvas.offsetTop}
}
