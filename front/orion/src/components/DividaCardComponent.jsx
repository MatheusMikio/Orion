import styles from "./DividaCard.module.css"

export default function DividaCardComponent({divida}){
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
        </div>
    )
}