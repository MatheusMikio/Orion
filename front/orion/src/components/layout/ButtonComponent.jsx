import styles from "./Button.module.css"

export default function ButtonComponent({text, customClass, onClick}){
    return(
        <button className={`${styles.btn} + ${customClass}`} onClick={onClick}>
            {text}
        </button>
    )
}