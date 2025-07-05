import ClientCardComponent from "../components/ClienteCardComponent";
import styles from "./Clientes.module.css"

const clients = [
    { id: 1, nome: "Marcos Andrade", cpf: "123.456.789-10", email: "marcos@gmail.com", idade: 18, totalDivida: 10000 },
    { id: 2, nome: "Ana Beatriz Silva", cpf: "234.567.890-21", email: "ana.silva@gmail.com", idade: 25, totalDivida: 3200 },
    { id: 3, nome: "Carlos Eduardo Lima", cpf: "345.678.901-32", email: "carlos.lima@hotmail.com", idade: 30, totalDivida: 8700 },
    { id: 4, nome: "Fernanda Souza", cpf: "456.789.012-43", email: "fernanda.souza@yahoo.com", idade: 22, totalDivida: 1500 },
    { id: 5, nome: "Ricardo Mendes", cpf: "567.890.123-54", email: "ricardo.mendes@gmail.com", idade: 40, totalDivida: 21000 },
    { id: 6, nome: "Juliana Castro", cpf: "678.901.234-65", email: "juliana.castro@outlook.com", idade: 35, totalDivida: 950 },
    { id: 7, nome: "Bruno Ferreira", cpf: "789.012.345-76", email: "bruno.ferreira@gmail.com", idade: 28, totalDivida: 4100 },
    { id: 8, nome: "Patrícia Gomes", cpf: "890.123.456-87", email: "patricia.gomes@hotmail.com", idade: 31, totalDivida: 12300 },
    { id: 9, nome: "Lucas Martins", cpf: "901.234.567-98", email: "lucas.martins@gmail.com", idade: 27, totalDivida: 780 },
    { id: 10, nome: "Camila Rocha", cpf: "012.345.678-09", email: "camila.rocha@yahoo.com", idade: 45, totalDivida: 20000 },
    { id: 11, nome: "João Pedro Farias", cpf: "111.222.333-44", email: "joao.farias@gmail.com", idade: 37, totalDivida: 5600 },
    { id: 12, nome: "Larissa Melo", cpf: "222.333.444-55", email: "larissa.melo@hotmail.com", idade: 26, totalDivida: 1900 },
    { id: 13, nome: "Mateus Albuquerque", cpf: "333.444.555-66", email: "mateus.albuquerque@outlook.com", idade: 33, totalDivida: 7200 },
    { id: 14, nome: "Débora Lins", cpf: "444.555.666-77", email: "debora.lins@gmail.com", idade: 29, totalDivida: 3600 },
    { id: 15, nome: "Eduardo Tavares", cpf: "555.666.777-88", email: "eduardo.tavares@yahoo.com", idade: 41, totalDivida: 13400 },
    { id: 16, nome: "Bruna Nascimento", cpf: "666.777.888-99", email: "bruna.nascimento@gmail.com", idade: 24, totalDivida: 2500 },
    { id: 17, nome: "Tiago Cunha", cpf: "777.888.999-00", email: "tiago.cunha@hotmail.com", idade: 38, totalDivida: 870 },
    { id: 18, nome: "Amanda Reis", cpf: "888.999.000-11", email: "amanda.reis@gmail.com", idade: 34, totalDivida: 10200 },
    { id: 19, nome: "Felipe Cardoso", cpf: "999.000.111-22", email: "felipe.cardoso@outlook.com", idade: 36, totalDivida: 4700 },
    { id: 20, nome: "Tatiane Duarte", cpf: "000.111.222-33", email: "tatiane.duarte@gmail.com", idade: 43, totalDivida: 15700 }
];



export default function ClientesView(){
    return(
        <>
        <div className={styles.client_container}>
            {clients.map((client) =>(
                <ClientCardComponent key={client.id} client={client}/>
            ))}
        </div>
        <div className={styles.client_footer}>
            <h3>Total das dividas:</h3>
            <span>{clients.reduce((total, client) => total + client.totalDivida,0).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</span>
        </div>
        </>
    )
}