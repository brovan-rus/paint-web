import {Draw, Fill} from "../../types/Canvas";
import Canvas from "../Canvas";
import styles from './DrawingPanel.module.css';
import {useContext} from "react";
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";
import {RGBColor} from "react-color";
import {hexToRgb} from "../../utils/hexToRgb";
import {Coordinate} from "../../types/Coordinate";

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

    const bucket: Fill = ({context, canvas,originalMousePosition }) => {
        if(!originalMousePosition?.x && !originalMousePosition?.y) {
            return;
        }

        const colorLayer = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log(colorLayer);

        const fillColor = hexToRgb(color);

        const getPixelPosition = ({x, y}: Coordinate): number => {
            return (y * canvas.width + x) * 4;
        }

        const startingColor: RGBColor = {
            r: colorLayer.data[getPixelPosition(originalMousePosition)],
            g: colorLayer.data[getPixelPosition(originalMousePosition) + 1],
            b: colorLayer.data[getPixelPosition(originalMousePosition) + 2]}

        console.log(startingColor);

        const matchStartColor = (pixelPosition: number) => (
            colorLayer.data[pixelPosition] === startingColor.r &&
            colorLayer.data[pixelPosition + 1] === startingColor.g &&
            colorLayer.data[pixelPosition + 2] === startingColor.b
        )

        const colorPixel = (pixelPosition: number) => {
            colorLayer.data[pixelPosition] = fillColor.r;
            colorLayer.data[pixelPosition + 1] = fillColor.g;
            colorLayer.data[pixelPosition + 2] = fillColor.b;
            colorLayer.data[pixelPosition + 3] = 255;
        }

        const pixelStack = [[originalMousePosition.x, originalMousePosition.y]];

        while(pixelStack.length) {
            const newPosition = pixelStack.pop();
            if (!newPosition) {
                return;
            }
            let [x, y] = newPosition;
            let pixelPosition = (y * canvas.width + x) * 4;

            while( y-- >= 0 && matchStartColor(pixelPosition)) {
                pixelPosition -= canvas.width  * 4;
            }
            pixelPosition += canvas.width * 4;
            y += 1;
            let reachLeft = false;
            let reachRight = false;
            while(y++ < (canvas.height - 1) && matchStartColor(pixelPosition)) {
                colorPixel(pixelPosition);
                if (x > 0) {
                    if (matchStartColor(pixelPosition - 4)) {
                        if(!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true
                        } else if (reachLeft) {
                            reachLeft = false;
                        }
                    }
                }

                if (x < (canvas.width - 1)) {
                    if(matchStartColor(pixelPosition + 4)) {
                        if(!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        } else if (reachRight) {
                            reachRight = false;
                        }
                    }
                }
                pixelPosition += canvas.width * 4;
            }
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
