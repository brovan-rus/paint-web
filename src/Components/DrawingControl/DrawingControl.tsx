import ColorPicker from "../ColorPicker/ColorPicker";
import Slider from "../Slider/Slider";
import styles from './DrawingControl.module.css';

const DrawingControl = () => {
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Choose color</h2>
            <ColorPicker width={'350px'}/>
            <h2 className={styles.title}>Choose thickness</h2>
            <Slider />
        </div>
    )
}

export default DrawingControl;
