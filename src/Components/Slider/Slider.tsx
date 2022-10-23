import {useContext} from "react";
import ReactSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {DrawContext} from "../contexts/DrawContext";
import {DrawContextType} from "../../types/DrawContext";
import styles from './Slider.module.css'

const Slider = () => {
    const {thickness, setThickness} = useContext(DrawContext) as DrawContextType;
    return (
        <div className={styles.container}>
            <ReactSlider className={styles.slider} defaultValue={5} min={5} max={50} value={thickness} onChange={setThickness}/>
            <p>{thickness}</p>
        </div>
    );
}

export default Slider;
