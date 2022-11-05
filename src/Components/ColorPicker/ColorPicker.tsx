import {useContext} from "react";
import {ColorResult, SketchPicker} from 'react-color';
import {SketchPickerProps} from "react-color/lib/components/sketch/Sketch";
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";

const ColorPicker = (props: SketchPickerProps) => {
    const { color, setColor } = useContext(DrawContext) as DrawContextType;
    const changeColor = (color: ColorResult) => {
        setColor(color.hex);
    }
    return(
        <SketchPicker {...props} color={color} onChangeComplete={changeColor} />
    )
}

export default ColorPicker;
