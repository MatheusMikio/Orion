import ClientCardComponent from "../components/ClienteCardComponent";
import styles from "./Clientes.module.css"
const client = {
    nome: "Marcos Andrade",
    cpf: "123.456.789-10",
    email: "marcos@gmail.com",
    idade : 18,
    totalDivida: 10000
}

export default function ClientesView(){
    return(
        <div className={styles.client_container}>
            <ClientCardComponent client={client}/>
        </div>
    )
}