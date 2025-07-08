import styles from "./ClientCard.module.css"
import LinkButton from "./layout/LinkButton"

export default function ClientCardComponent({client}){

    const formatCPF = (cpf) => {
        const cleaned = cpf.replace(/\D/g, ""); 
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    return(
        <div className={styles.card}>
            <ul>
                <li>
                    <span>Nome:</span> {client.nome}
                </li>
                <li>
                    <span>CPF:</span> {formatCPF(client.cpf)}
                </li>
                <li>
                    <span>Email:</span> {client.email}
                </li>
                <li>
                    <span>Idade:</span> {client.idade}
                </li>
                <li>
                    <span>Valor Total:</span> {client.dividas.reduce((total, divida) => total + divida.valor, 0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}
                </li>
            </ul>
            <div>
                <LinkButton text="VER MAIS" to={`${client.id}`} customClass={styles.btn}/>
            </div>
        </div>
    )
}