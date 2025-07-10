import { useState } from "react"
import styles from "./Form.module.css"
import Input from "./Input"


export default function FormDividaUpdate({handleSubmit, divida, onClose}){

    if (!divida) return <h1>Carregando</h1>
    const [status, setStatus] = useState(divida.situacao)
    console.log(divida)

    return(
        
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <h2>Editar Dívida</h2>
            <input type="hidden" name="id" value={divida.id}/>
            <Input type="number" placeholder="R$200,00" text="Valor:" name="valor" defaultValue={divida.valor} step="0.01"/>
            <div className={styles.select}>
                <label htmlFor="situacao">Situacao:</label>
                <select name="situacao" id="situacao" onChange={(e) => setStatus(e.target.value)} defaultValue={divida.situacao}>
                    <option value="0">Pendente</option>
                    <option value="1">Pago</option>
                </select>
            </div>
            {status == "1" && (
                <Input type="date" text="Data de pagamento:" name="dataPagamento" defaultValue={divida.dataPagamento ? divida.dataPagamento.slice(0, 10) : ""} />
            )}
            <Input type="text" placeholder="Mercado" text="Descrição:" name="descricao" defaultValue={divida.descricao}/>
            <div className={styles.btns}>
                <Input type="button" onClick={onClose} value="Fechar"/>
                <Input type="submit" value="Atualizar"/>
            </div>  
        </form>
    )
}