import {Coordinate} from "../../types/Coordinate";
import styles from './RoundCursor.module.css'
interface RoundCursorProps {
    diameter?: number;
    coordinate: Coordinate,
}

const RoundCursor = ({diameter = 5, coordinate}: RoundCursorProps) => {
    const style = {
        width: `${diameter}px`,
        height: `${diameter}px`,
        top: `${coordinate.y}px`,
        left: `${coordinate.x}px`,
    };
    return(
        <div className={styles.cursor} style={style} />
    )
}

export default RoundCursor;
