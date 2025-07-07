import DividaClientCardComponent from "../components/DividaClientCardComponent"
import styles from "./Dividas.module.css"
const dividas = [
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pago",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 100,
        situacao: "Pendente",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz"
    },
]




export default function ClientInfoView(){    
    return(
        <>
        <div className={styles.divida_header}>
            <h1>Cliente: <span>Marcos</span></h1>
        </div>
        <div className={styles.divida_container}> 
            {dividas.map((divida, index) => (
                <DividaClientCardComponent key={index} divida={divida}/>
            ))}
        </div>
        <div className={styles.divida_footer}>
            <h3>Total das dividas:</h3>
            <span>{dividas.reduce((total, divida) => total + divida.valor,0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</span>
        </div>
        </>
    )
}