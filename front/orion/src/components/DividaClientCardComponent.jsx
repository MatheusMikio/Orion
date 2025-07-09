import { useState } from "react"
import styles from "./DividaClientCard.module.css"
import ButtonComponent from "./layout/ButtonComponent"

export default function DividaCardComponent({divida, onExcluir, onEditar, onToggle}){

    const status = ["Pendente", "Pago"]

    return(
        <div className={styles.card}>
            <div>
                <ul>
                    <li><span>Valor:</span> {divida.valor.toLocaleString("pt-br", {style: "currency", currency: "BRL"})}</li>
                    <li><span>Status:</span> {status[divida.situacao]}</li>
                    {divida.situacao === 1 && (
                        <li><span>Pago em:</span> {new Date(divida.dataPagamento).toLocaleDateString()}</li>
                    )}
                    <li><span>Descrição:</span> {divida.descricao}</li>
                </ul>
            </div>
            <div className={styles.btns}>
                <ButtonComponent text="Excluir" customClass={styles.excluir} onClick={onExcluir}/>
                <ButtonComponent text="Editar" customClass={styles.editar} onClick={onEditar}/>
                <ButtonComponent text={divida.situacao === 1 ? "Pendente" : "Pagar"} 
                customClass={divida.situacao == 1 ? styles.pendente : styles.pagar} onClick={onToggle}/>
            </div>
        </div>
    )
}