import ClientCardComponent from "../components/layout/ClienteCardComponent";

const client = {
    nome: "Marcos Andrade",
    cpf: "123.456.789-10",
    email: "marcos@gmail.com",
    idade : 18

}

export default function ClientesView(){
    return(
        <ClientCardComponent client={client}/>
    )
}