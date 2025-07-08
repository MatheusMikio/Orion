import DividaCardComponent from "../components/DividaCardComponent";
import { getDividas } from "../services/dividaService";
import styles from "./Dividas.module.css"
import { useState, useEffect } from "react";




export default function DividasView(){

    const [dividas, setDividas] = useState([]);
    const fetchData = async () =>{
    const response = await getDividas();
    

    if (response.status === 200) setDividas(response.data);
}

useEffect(() => {
    fetchData();
  }, [fetchData]);

    return(
        <>
        <div className={styles.divida_container}>
            {dividas.length > 0 ? (
                dividas.map((divida) =>(
                    <DividaCardComponent key={divida.id} divida={divida}/>
                ))
            ) : (
                <h2>Nenhuma dívida encontrada!</h2>
            )
            }
        </div>
        <div className={styles.divida_footer}>
            <h3>Total das dividas:</h3>
            <span>{dividas.reduce((total, divida) => total + divida.valor,0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</span>
        </div>
        </>
    )
}