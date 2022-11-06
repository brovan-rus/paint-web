import {Draw, Fill} from "../../types/Canvas";
import Canvas from "../Canvas";
import styles from './DrawingPanel.module.css';
import {useContext} from "react";
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";
import {floodFill} from "../../utils/instruments/floodFill";

const DrawingPanel = () => {
    const { color, thickness, activeInstrument } = useContext(DrawContext) as DrawContextType;
    const pencil: Draw = ({context, originalMousePosition, newMousePosition}) => {
        if (!originalMousePosition || !newMousePosition || !color) {
            return;
        }

        context.strokeStyle = color as string;
        context.lineJoin = 'round';
        context.lineWidth = thickness;
        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();
        context.stroke();

        context.fillRect(0, 0, 80, 80);

    }

    const bucket: Fill = ({canvas,originalMousePosition }) => {
        if (!color || !originalMousePosition) {
            return;
        }
        const colorLayer = floodFill({mousePosition: originalMousePosition, canvas, color})
        const context = canvas.getContext('2d');
        if (!context || !colorLayer) {
            return;
        }
        context.putImageData(colorLayer, 0, 0);
    }

    const instrumentCallback: Record<string, any> = {
        pencil: pencil,
        bucket: bucket,
    }

    return <Canvas className={styles.canvas} draw={instrumentCallback[activeInstrument]} />
}

export default DrawingPanel;
