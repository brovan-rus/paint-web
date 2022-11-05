import {Color, RGBColor} from "react-color";

export const hexToRgb = (hexColor: Color | undefined): RGBColor => {
    if (typeof hexColor !== "string") {
        throw new Error('Wrong argument type')
    }
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return {r, g, b}
}
