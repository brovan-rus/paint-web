import {Color, RGBColor} from "react-color";
import {Coordinate} from "../../types/Coordinate";

export const hexToRgb = (hexColor: Color | undefined): RGBColor => {
    if (typeof hexColor !== "string") {
        throw new Error('Wrong argument type')
    }
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return {r, g, b}
}

export const matchStartColor = (pixelPosition: number, colorLayer: ImageData, startingColor: RGBColor) => (
    colorLayer.data[pixelPosition] === startingColor.r &&
    colorLayer.data[pixelPosition + 1] === startingColor.g &&
    colorLayer.data[pixelPosition + 2] === startingColor.b
)

const getPixelPosition = ({x, y}: Coordinate, canvas: HTMLCanvasElement): number => {
    return (y * canvas.width + x) * 4;
}

type FloodFill = (props: {
    mousePosition?: Coordinate,
    canvas: HTMLCanvasElement,
    color: Color,
}) => ImageData | void;


export const getStartingColor = (colorLayer: ImageData, position: Coordinate, canvas: HTMLCanvasElement): RGBColor => ({
    r: colorLayer.data[getPixelPosition(position, canvas)],
    g: colorLayer.data[getPixelPosition(position,  canvas) + 1],
    b: colorLayer.data[getPixelPosition(position, canvas) + 2]
});

export const floodFill: FloodFill = ({mousePosition, canvas, color}) => {
    if (!mousePosition) {
        return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }
    const colorLayer = context.getImageData(0, 0, canvas.width, canvas.height);
    const fillColor = hexToRgb(color);
    const startingColor = getStartingColor(colorLayer, mousePosition, canvas);

    const colorPixel = (pixelPosition: number) => {
        colorLayer.data[pixelPosition] = fillColor.r;
        colorLayer.data[pixelPosition + 1] = fillColor.g;
        colorLayer.data[pixelPosition + 2] = fillColor.b;
        colorLayer.data[pixelPosition + 3] = 255;
    };

    const pixelStack = [[mousePosition.x, mousePosition.y]];
    let stackPointer = 1;

    while(stackPointer) {
        const newPosition = pixelStack[--stackPointer];
        if (!newPosition) {
            return;
        }
        let [x, y] = newPosition;
        let pixelPosition = (y * canvas.width + x) * 4;

        while( y-- >= 0 && matchStartColor(pixelPosition, colorLayer, startingColor)) {
            pixelPosition -= canvas.width  * 4;
        }
        pixelPosition += canvas.width * 4;
        y += 1;
        let reachLeft = false;
        let reachRight = false;
        while(y++ < (canvas.height - 1) &&  matchStartColor(pixelPosition, colorLayer, startingColor)) {
            colorPixel(pixelPosition);
            if (x > 0) {
                if (matchStartColor(pixelPosition - 4, colorLayer, startingColor)) {
                    if(!reachLeft) {
                        pixelStack[stackPointer++] = [x - 1, y];
                        reachLeft = true
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }
            }

            if (x < (canvas.width - 1)) {
                if(matchStartColor(pixelPosition + 4, colorLayer, startingColor)) {
                    if(!reachRight) {
                        pixelStack[stackPointer++] = [x + 1, y];
                        reachRight = true;
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }
            }
            pixelPosition += canvas.width * 4;
        }
    }

    return colorLayer;
}
