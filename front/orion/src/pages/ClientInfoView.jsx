import DividaClientCardComponent from "../components/DividaClientCardComponent"
import styles from "./Dividas.module.css"
import { useParams } from "react-router-dom";
import { getClientId } from "../services/clienteService";
import { useEffect, useState } from "react";


export default function ClientInfoView(){
    
    const { clientId } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        getClientId(clientId).then(response => {
            if (response.status === 200){
                setClient(response.data)
            }
        })
    }, [clientId])
    
    console.log(client)

    return (
    <>
        <div className={styles.divida_header}>
            <h1>Cliente: <span>{client ? client.nome : '...'}</span></h1>
        </div>

        <div className={styles.divida_container}> 
            {!client ? (
                <h2>Carregando cliente...</h2>
            ) : client.dividas.length > 0 ? (
                client.dividas.map((divida, index) => (
                    <DividaClientCardComponent key={index} divida={divida} />
                ))
            ) : (
                <h2>Não há dividas registradas para este cliente.</h2>
            )}
        </div>

        {client && (
            <div className={styles.divida_footer}>
                <h3>Total das dividas:</h3>
                <span>
                    {client.dividas.reduce((total, divida) => total + divida.valor, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
            </div>
        )}
    </>
);

}