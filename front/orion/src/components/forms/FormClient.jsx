import { useReducer } from "react"
import styles from "./Form.module.css"
import Input from "./Input"

export default function FormClient({handleSubmit}){

    const [cpf, setCpf] = useReducer((_, newValue) =>{
    
        if (!newValue) return "";

        const digitos = newValue.replace(/\D/g, "").slice(0,11);
        return digitos.replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }, "")

    return(
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off" >
            <Input type="text" placeholder="Fulano de Tal" text="Nome:" name="nome" required/>   
            <Input type="text" placeholder="123.456.789-10" text="CPF:" name="cpf" value={cpf} minLength={14} maxLength={14}  
            required onKeyDown={(e) => {
                if (e.key.length === 1 &&  !/\d/.test(e.key)){
                    e.preventDefault()
                }
            }} onChange={(e) => setCpf(e.target.value)}/>   
            <Input type="date" text="Data de nascimento:" name="dataNascimento" required/>   
            <Input type="email" placeholder="fulano@gmail.com" text="Email:" name="email" required/>
            <Input type="submit" value="Cadastrar"/>  
        </form>
    )
}