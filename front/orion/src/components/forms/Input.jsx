import styles from "./Input.module.css"

export default function Input({type, placeholder, text, name, value, onChange, onKeyDown, onClick, 
    defaultValue, step, maxLength, pattern, minLength}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onClick={onClick}
                defaultValue={defaultValue}
                step={step}
                maxLength={maxLength}
                required
                pattern={pattern}
                minLength={minLength}
            />
        </div>
    )
}