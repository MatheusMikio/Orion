import styles from "./Button.module.css"

export default function ButtonComponent({text, type, customClass, onClick}){
    return(
        <button type={type}className={`${styles.btn} + ${customClass}`} onClick={onClick}>
            {text}
        </button>
    )
}