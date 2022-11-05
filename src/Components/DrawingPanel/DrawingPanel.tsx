import {Draw} from "../../types/Canvas";
import Canvas from "../Canvas";
import styles from './DrawingPanel.module.css';
import {useContext} from "react";
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";

const DrawingPanel = () => {
    const { color, thickness } = useContext(DrawContext) as DrawContextType;
    const draw: Draw = ({context, originalMousePosition, newMousePosition}) => {
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
    }

    return <Canvas className={styles.canvas} draw={draw} />
}

export default DrawingPanel;
