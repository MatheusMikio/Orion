import styles from "./DividaCard.module.css"

export default function DividaCardComponent(divida){
    return(
        <div className={divida.situacao == "Pago" ? styles.card_pago : styles.card_pendente}>
            <div>
                <ul>
                    <li><span>Valor:</span> {divida.valor}</li>
                    <li><span>Status:</span> {divida.situacao}</li>
                    {divida.situacao == "Pago" && (
                        <li><span>Data de pagamentp:</span> {divida.dataPagamento}</li>
                    )}
                    <li><span>Descrição:</span> {divida.descricao}</li>
                </ul>
            </div>
            <div>

            </div>
        </div>
    )
}