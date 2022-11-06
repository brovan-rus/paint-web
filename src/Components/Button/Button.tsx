import styles from './Button.module.css'
import cn from 'classnames';
import { instrumentIcons } from "../../utils/constants/instruments";

interface ButtonProps {
    children?: JSX.Element,
    name: string
    active: boolean,
    handleButtonClick: (name: string) => void,
}

const Button = ({ children, name, active = false, handleButtonClick }: ButtonProps) => {
    const onClick = () => {
        handleButtonClick(name);
    }

    return (
        <button onClick={onClick} className={ cn(styles.button, active && styles.active) }>
            <img className={styles.image} src={instrumentIcons[name]} />
        </button>
    )
}

export default Button;
