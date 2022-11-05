import {useContext} from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import Slider from "../Slider/Slider";
import styles from './DrawingControl.module.css';
import Button from "../Button/Button";
import {INSTRUMENTS} from "../../utils/constants/instruments";
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";


const DrawingControl = () => {
    const { activeInstrument, setActiveInstrument } = useContext(DrawContext) as DrawContextType;
    const handleButtonClick = (instrument: string) => setActiveInstrument(instrument);

    return(
        <div className={styles.container}>
                {Object.values(INSTRUMENTS).map((instrument) => (
                     <Button handleButtonClick={handleButtonClick} key={instrument} name={instrument} active={activeInstrument === instrument} />
                    ))}

        </div>
    )
}

export default DrawingControl;
