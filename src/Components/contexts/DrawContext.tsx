import { createContext, useState } from 'react';
import {DrawContextType} from "../../types/DrawContext";

type Props = {
    children?: JSX.Element | JSX.Element[];
}

const DrawContext = createContext <DrawContextType | {}> ({});
const DrawContextProvider = (props: Props) => {
    const { children } = props;
    const [color, setColor] = useState <string | {}> ('#FF0000');
    const [activeInstrument, setActiveInstrument] = useState<string | {}>('pencil');
    const [thickness, setThickness] = useState<number>(1);
    return (
        <DrawContext.Provider value={{color, setColor, thickness, setThickness, activeInstrument, setActiveInstrument}}>
            {children}
        </DrawContext.Provider>
    )
}

export { DrawContext, DrawContextProvider };
