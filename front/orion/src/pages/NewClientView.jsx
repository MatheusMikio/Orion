import { useState } from "react";
import FormClient from "../components/forms/FormClient";
import styles from "./NewClient.module.css"
import { useNavigate } from "react-router-dom";
import { cadastrarCliente } from "../services/clienteService";

export default function NewClientView(){

    const navigate = useNavigate();
    const [erros, setErros] = useState([])
    
    const submitForm = async (e) =>{
        e.preventDefault();
        var formData = new FormData(e.target);
        const cliente = {
            nome: formData.get("nome"),
            cpf: formData.get("cpf"),
            dataNascimento: formData.get("dataNascimento") ? new Date(formData.get("dataNascimento")) : null,
            email: formData.get("email")
        }
        console.log(cliente)
        const response = await cadastrarCliente(cliente)

        if (response.status === 201) navigate("/clientes")

        else if (response.status === 422){
            setErros(response.data)
            console.log(response.data)
        }
    }

    return (
    <div className={styles.container}>
        <h1>Cadastro de cliente</h1>  
        <div className={styles.form}>
            <FormClient handleSubmit={submitForm}/>
            {erros.length > 0 && (
                <div className={styles.erros}>
                    <ul>
                        {erros.map((erro, index) => (
                            <li key={index}>{erro.mensagem}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
    )
}