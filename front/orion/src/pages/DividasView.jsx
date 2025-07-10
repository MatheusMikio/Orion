import DividaCardComponent from "../components/DividaCardComponent";
import PaginacaoComponent from "../components/layout/PaginacaoComponent";
import { getDividas } from "../services/dividaService";
import styles from "./Dividas.module.css"
import { useState, useEffect } from "react";

export default function DividasView(){

    const [dividas, setDividas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const tamanho = 10;
    const [maisPaginas, setMaisPaginas] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDividas(pagina, tamanho);
            if (response.status === 200) {
                setDividas(response.data);
                setMaisPaginas(response.data.length === tamanho);
            }
        };
        fetchData();
    }, [pagina]);

    const handleAnterior = () => {
        if (pagina > 1) setPagina(pagina- 1);
    };

    const handleProximo = () => {
        if (maisPaginas) setPagina(pagina + 1);
    };

    return(
        <div className={styles.mainContainer}>
            <div className={styles.divida_container}>
                {dividas.length > 0 ? (
                    dividas.map((divida) =>(
                        <DividaCardComponent key={divida.id} divida={divida}/>
                    ))
                ) : (
                    <h2>Nenhuma dívida encontrada!</h2>
                )}
            </div>
            <PaginacaoComponent pagina={pagina} handleAnterior={handleAnterior} handleProximo={handleProximo} temMaisPaginas={maisPaginas}/>
        
            <div className={styles.divida_footer}>
                <h3>Total das dividas:</h3>
                <span>{dividas.reduce((total, divida) => total + divida.valor,0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</span>
            </div>
        </div>
    )
}