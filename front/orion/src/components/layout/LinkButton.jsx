import { Link } from 'react-router-dom'
import styles from "./LinkButton.module.css"

export default function LinkButton({to, text, customClass}){
    return(
        <Link className={customClass ? customClass : styles.btn} to={to}>
            {text}
        </Link>
    )
}