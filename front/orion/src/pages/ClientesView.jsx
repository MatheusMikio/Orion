import { useState, useEffect } from "react";
import ClientCardComponent from "../components/ClienteCardComponent";
import { getClients } from "../services/clienteService";
import styles from "./Clientes.module.css"
import PaginacaoComponent from "../components/layout/PaginacaoComponent";
import { useLocation } from "react-router-dom";


export default function ClientesView(){
    const [clients, setClients] = useState([]);
    const [pagina, setPagina] = useState(1);
    const tamanho = 10;
    const [maisPaginas, setMaisPaginas] = useState(true)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchData = async () => {
            const response = await getClients(pagina, tamanho, searchQuery);
            if (response.status === 200){
                setClients(response.data);
                setMaisPaginas(response.data.length === tamanho)
            }
        };
        fetchData();
        if (searchQuery) setPagina(1);
    }, [pagina, searchQuery]);

    const handleAnterior = () => {
        if (pagina > 1) setPagina(pagina - 1);
    }

    const handleProximo = () =>{
        if (maisPaginas) setPagina(pagina + 1);
    }

    return(
        <>
        <div className={styles.mainContainer}>
            <div className={styles.client_container}>
                {clients.length > 0 ? (
                    clients.map((client) =>(
                        <ClientCardComponent key={client.id} client={client}/>
                    ))
                ) : (
                    <h2>Nenhum cliente encontrado!</h2>
                )}
            </div>
            <PaginacaoComponent pagina={pagina} handleAnterior={handleAnterior} handleProximo={handleProximo} temMaisPaginas={maisPaginas}/>
            <div className={styles.client_footer}>
                <h3>Total das dividas:</h3>
                <span>
                    {clients.reduce((total, client) => total + client.dividas.reduce((total, divida) => total + divida.valor, 0),0)
                    .toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}
                </span>
            </div>
        </div>
        </>
    )
}