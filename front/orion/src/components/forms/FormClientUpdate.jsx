import { useReducer } from "react"
import styles from "./Form.module.css"
import Input from "./Input"
import ButtonComponent from "../layout/ButtonComponent"

export default function FormClientUpdate({handleSubmit, client, onClose}){

    const formatCpf = (value) => {
        const digitos = value.replace(/\D/g, "").slice(0, 11);
        return digitos
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const [cpf, setCpf] = useReducer((_,  newValue) => {
        if (!newValue) return "";
        return formatCpf(newValue);
    }, formatCpf(client.cpf || ""));



    return(
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off" >
            <input type="hidden" name="id" value={client.id}/>
            <Input type="text" placeholder="Fulano de Tal" text="Nome:" name="nome" defaultValue={client.nome}/>   
            <Input type="text" placeholder="123.456.789-10" text="CPF:" name="cpf" value={cpf} maxLength={14}  
            onKeyDown={(e) => {
                if (e.key.length === 1 &&  !/\d/.test(e.key)){
                    e.preventDefault()
                }
            }} onChange={(e) => setCpf(e.target.value)} pattern="\d{3}\.\d{3}\.\d{3}\-\d{2}"/>   
            <Input type="date" text="Data de nascimento:" name="dataNascimento" defaultValue={client.dataNascimento.split("T")[0]}/>   
            <Input type="email" placeholder="fulano@gmail.com" text="Email:" name="email" defaultValue={client.email}/>
            <div className={styles.btns}>
                <ButtonComponent type="button" text="Voltar" onClick={onClose} customClass={styles.voltar}/>
                <ButtonComponent type="submit" text="Atualizar"/>
            </div>  
        </form>
    )
}