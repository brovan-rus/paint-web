import {useContext} from "react";
import {ColorResult, SketchPicker} from 'react-color';
import {SketchPickerProps} from "react-color/lib/components/sketch/Sketch";
import {DrawContext} from "../contexts/DrawContext";

const ColorPicker = (props: SketchPickerProps) => {
    //@ts-ignore
    const { color, setColor } = useContext(DrawContext);
    const changeColor = (color: ColorResult) => {
        setColor(color.hex);
    }
    return(
        <SketchPicker {...props} color={color} onChangeComplete={changeColor} />
    )
}

export default ColorPicker;
