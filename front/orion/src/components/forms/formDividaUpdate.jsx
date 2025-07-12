import { useState } from "react"
import styles from "./Form.module.css"
import Input from "./Input"


export default function FormDividaUpdate({handleSubmit, divida, onClose}){

    if (!divida) return <h1>Carregando...</h1>
    const [status, setStatus] = useState(divida.situacao)

    return(
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <h2>Editar Dívida</h2>
            <input type="hidden" name="id" value={divida.id}/>
            <input type="hidden" name="situacao" defaultValue={divida.situacao}/>
            <Input type="number" placeholder="R$200,00" text="Valor:" name="valor" defaultValue={divida.valor} step="0.01"/>
            {status == "1" && (
                <Input type="datetime-local" text="Data de pagamento:" name="dataPagamento" defaultValue={divida.dataPagamento ? divida.dataPagamento.slice(0, 19) : null} />
            )}
            <Input type="text" placeholder="Mercado" text="Descrição:" name="descricao" defaultValue={divida.descricao}/>
            <div className={styles.btns}>
                <Input type="button" onClick={onClose} value="Fechar"/>
                <Input type="submit" value="Atualizar"/>
            </div>  
        </form>
    )
}