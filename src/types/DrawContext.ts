import {Color} from "react-color";

export type DrawContextType = {
    color: Color | undefined,
    activeInstrument: string,
    setActiveInstrument: (value: string) => void;
    setColor: (color: Color) => void,
    setThickness: (value: number | number[]) => void;
    thickness: number,
};
