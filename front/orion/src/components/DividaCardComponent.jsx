import styles from "./DividaCard.module.css"

export default function DividaCardComponent({divida}){

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
        </div>
    )
}