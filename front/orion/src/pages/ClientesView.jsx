import { useState, useEffect } from "react";
import ClientCardComponent from "../components/ClienteCardComponent";
import { getClients } from "../services/clienteService";
import styles from "./Clientes.module.css"



export default function ClientesView(){

    const [clients, setClients] = useState([]);
    const fetchData = async () =>{
        const response = await getClients();
        
        if (response.status === 200) setClients(response.data);
    }

    useEffect(() => {
    fetchData();
  }, [fetchData]);

    return(
        <>
        <div className={styles.client_container}>
            {clients.length > 0 ? (
                clients.map((client) =>(
                    <ClientCardComponent key={client.id} client={client}/>
                ))
            ) : (
                <h2>Nenhum cliente encontrado!</h2>
            )
            }
        </div>
        <div className={styles.client_footer}>
            <h3>Total das dividas:</h3>
            <span>{clients.reduce((total, client) => total + client.dividas.reduce((total, divida) => total + divida.valor, 0),0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</span>
        </div>
        </>
    )
}