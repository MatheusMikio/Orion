import { useState } from "react"
import styles from "./Form.module.css"
import Input from "./Input"



export default function FormDivida({handleSubmit, clientes}){

    const [status, setStatus] = useState("0")

    return(
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <Input type="number" placeholder="R$200,00" text="Valor:" name="valor"/>
            <div className={styles.select}>
                <label htmlFor="situacao">Situacao:</label>
                <select name="situacao" id="situacao" onChange={(e) => setStatus(e.target.value)}>
                    <option value="0">Pendente</option>
                    <option value="1">Pago</option>
                </select>
            </div>
            {status === "1" && (
                <Input type="date" text="Data de pagamento:" name="dataPagamento"/>
            )}
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