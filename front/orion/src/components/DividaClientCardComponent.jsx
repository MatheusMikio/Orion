import styles from "./DividaClientCard.module.css"
import ButtonComponent from "./layout/ButtonComponent"

export default function DividaCardComponent({divida, onExcluir, onEditar, onToggle}){
    return(
        <div className={styles.card}>
            <div>
                <ul>
                    <li><span>Valor:</span> {divida.valor.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</li>
                    <li><span>Status:</span> {divida.situacao}</li>
                    {divida.situacao == "Pago" && (
                        <li><span>Pago em:</span> {divida.dataPagamento}</li>
                    )}
                    <li><span>Descrição:</span> {divida.descricao}</li>
                </ul>
            </div>
            <div className={styles.btns}>
                <ButtonComponent text="Excluir" customClass={styles.excluir} onClick={onExcluir}/>
                <ButtonComponent text="Editar" customClass={styles.editar} onClick={onEditar}/>
                <ButtonComponent text={divida.situacao == "Pago" ? "Pendente" : "Pagar"} 
                customClass={divida.situacao == "Pago" ? styles.pendente : styles.pagar} onClick={onToggle}/>
            </div>
        </div>
    )
}