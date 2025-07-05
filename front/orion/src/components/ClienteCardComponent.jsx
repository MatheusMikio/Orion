import styles from "./ClientCard.module.css"
import LinkButton from "./layout/LinkButton"

export default function ClientCardComponent({client}){
    return(
        <div className={styles.card}>
            <ul>
                <li><span>Nome:</span> {client.nome}</li>
                <li><span>CPF:</span> {client.cpf}</li>
                <li><span>Email:</span> {client.email}</li>
                <li><span>Idade:</span> {client.idade}</li>
                <li><span>Valor Total:</span> {client.totalDivida.toLocaleString('pt-BR',{ style : 'currency', currency: 'BRL'})}</li>
            </ul>
            <div>
                <LinkButton text="VER MAIS" to={`${client.id}`} customClass={styles.btn}/>
            </div>
        </div>
    )
}