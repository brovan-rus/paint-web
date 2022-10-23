import {CanvasHTMLAttributes, useCallback, useContext, useEffect, useState} from "react";
import useCanvas from "../../hooks/useCanvas";
import {Draw} from "../../types/Canvas";
import RoundCursor from "../RoundCursor/RoundCursor";
import styles from './Canvas.module.css';
import cn from 'classnames';
import {getCoordinates} from "../../utils/CanvasUtils";
import {Coordinate} from "../../types/Coordinate";
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";

type CanvasProps = CanvasHTMLAttributes<any> & {draw: Draw, preDraw?: Draw, postDraw?: Draw, cursorDiameter?: number};

const Canvas = (props: CanvasProps) => {
    const {draw, preDraw, postDraw, cursorDiameter, ...rest} = props;
    const canvasRef = useCanvas(draw, preDraw, postDraw);
    const { thickness } = useContext(DrawContext) as DrawContextType;

    const [mouseOver, setMouseOver] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

    const trackCursor = useCallback((e: MouseEvent) => {
        setMousePosition(getCoordinates(e, canvasRef));
    }, [canvasRef]);

    const onMouseOver = useCallback(() => setMouseOver(true), [setMouseOver]);
    const onMouseLeave = useCallback(() => setMouseOver(false), [setMouseOver]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseover', onMouseOver);
        canvas.addEventListener('mousemove', (e) =>  trackCursor(e));
        canvas.addEventListener('mouseleave', onMouseLeave);
        return () => {
            canvas.removeEventListener('mouseover', onMouseOver);
            canvas.removeEventListener('mousemove', (e) => trackCursor(e));
            canvas.removeEventListener('mouseleave', onMouseLeave);
        }
    }, [trackCursor, canvasRef, onMouseOver, onMouseLeave])

    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} {...rest} className={cn(mouseOver && styles.noCursor, styles.canvas)} />
            {mouseOver && mousePosition && <RoundCursor diameter={thickness} coordinate={mousePosition} />}

        </div>

    );
}

export default Canvas;
