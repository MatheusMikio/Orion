import DividaCardComponent from "../components/DividaCardComponent";
import styles from "./Dividas.module.css"

const dividas = [
    {
        valor: 100,
        situacao: "Pago",
        dataPagamento: "01/01/2021",
        descricao: "Conta de luz, agua, gas"
    },
    {
        valor: 250,
        situacao: "Em aberto",
        dataPagamento: "",
        descricao: "Cartão de crédito"
    },
    {
        valor: 80,
        situacao: "Pago",
        dataPagamento: "15/03/2021",
        descricao: "Internet"
    },
    {
        valor: 300,
        situacao: "Em atraso",
        dataPagamento: "",
        descricao: "Parcela do carro"
    },
    {
        valor: 90,
        situacao: "Pago",
        dataPagamento: "05/04/2021",
        descricao: "Telefone celular"
    },
    {
        valor: 150,
        situacao: "Pago",
        dataPagamento: "20/02/2021",
        descricao: "Plano de saúde"
    },
    {
        valor: 60,
        situacao: "Em aberto",
        dataPagamento: "",
        descricao: "Assinatura de streaming"
    },
    {
        valor: 700,
        situacao: "Em atraso",
        dataPagamento: "",
        descricao: "Aluguel"
    },
    {
        valor: 50,
        situacao: "Pago",
        dataPagamento: "10/01/2021",
        descricao: "Transporte público"
    },
    {
        valor: 200,
        situacao: "Pago",
        dataPagamento: "25/05/2021",
        descricao: "Supermercado"
    },
    {
        valor: 180,
        situacao: "Em aberto",
        dataPagamento: "",
        descricao: "IPTU"
    },
    {
        valor: 120,
        situacao: "Pago",
        dataPagamento: "12/03/2021",
        descricao: "Conta de luz"
    },
    {
        valor: 300,
        situacao: "Em atraso",
        dataPagamento: "",
        descricao: "Faculdade"
    },
    {
        valor: 95,
        situacao: "Pago",
        dataPagamento: "28/02/2021",
        descricao: "Academia"
    },
    {
        valor: 400,
        situacao: "Em aberto",
        dataPagamento: "",
        descricao: "Parcela do notebook"
    },
    {
        valor: 60,
        situacao: "Pago",
        dataPagamento: "03/03/2021",
        descricao: "Seguro do carro"
    },
    {
        valor: 220,
        situacao: "Em atraso",
        dataPagamento: "",
        descricao: "Financiamento"
    },
    {
        valor: 75,
        situacao: "Pago",
        dataPagamento: "18/01/2021",
        descricao: "Farmácia"
    },
    {
        valor: 50,
        situacao: "Em aberto",
        dataPagamento: "",
        descricao: "Serviços bancários"
    },
    {
        valor: 500,
        situacao: "Pago",
        dataPagamento: "30/06/2021",
        descricao: "Viagem"
    }
];


export default function DividasView(){
    return(
        <>
        <div className={styles.divida_container}>
            {dividas.map((divida) =>(
                <DividaCardComponent key={divida.id} divida={divida}/>
            ))}
        </div>
        <div className={styles.divida_footer}>
            <h3>Total das dividas:</h3>
            <span>{dividas.reduce((total, divida) => total + divida.valor,0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</span>
        </div>
        </>
    )
}