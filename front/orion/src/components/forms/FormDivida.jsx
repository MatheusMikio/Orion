import { useState } from "react"
import styles from "./Form.module.css"
import Input from "./Input"

export default function FormDivida({handleSubmit, clientes}){

    return(
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <Input type="number" placeholder="R$200,00" text="Valor:" name="valor" step="0.01"/>
            <Input type="text" placeholder="Mercado" text="Descrição:" name="descricao" />
            <div className={styles.select}>
                <label htmlFor="clienteId">Cliente:</label>
                <select name="clienteId" id="clienteId" required>
                    <option disabled selected value="">Selecione um cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            </div>  
            <Input type="submit" value="Criar"/>  
        </form>
    )
}