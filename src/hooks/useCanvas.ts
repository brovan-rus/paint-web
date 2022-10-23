import {useRef, useEffect, useState, useCallback} from "react";
import {Draw} from "../types/Canvas";
import {Coordinate} from "../types/Coordinate";
import {getCoordinates} from "../utils/CanvasUtils";

function resizeCanvasToDisplaySize(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

    const {width, height} = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
        const {devicePixelRatio: ratio = 1} = window
        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)
        return true
    }

    return false
}

const preDraw: Draw = ({context, canvas}) => {
    if (!canvas) {
        return
    }
    context.save();
    resizeCanvasToDisplaySize(context, canvas)
}

const postDraw: Draw = ({context}) => {
    context.restore();
}

const useCanvas = (draw: Draw, _preDraw: Draw = preDraw, _postDraw: Draw = postDraw) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event, canvasRef);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
        }
    }, []);

    const paint = useCallback(
        (event: MouseEvent) => {
            if (!isPainting || !canvasRef.current) {
                return
            }
            const newMousePosition = getCoordinates(event, canvasRef);
            const canvas: HTMLCanvasElement = canvasRef.current;
            const context = canvas.getContext('2d');
            if (!context) {
                return;
            }
            if (mousePosition && newMousePosition) {
                draw({context, originalMousePosition: mousePosition, newMousePosition});
                setMousePosition(newMousePosition);
            }
        },
        [isPainting, mousePosition, draw]
    );

    const exitPaint = useCallback(() => {
        setIsPainting(false);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            if (!canvas) {
                return
            }
            canvas.removeEventListener('mousedown', startPaint);
        }
    }, [startPaint])

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        _preDraw({context, canvas});


    }, [draw, _preDraw, _postDraw])

    return canvasRef;
}

export default useCanvas;
