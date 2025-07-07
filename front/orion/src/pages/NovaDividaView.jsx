import FormDivida from "../components/forms/FormDivida";
import styles from "./NewClient.module.css"

const clientes = [
  { id: 1, nome: "Ana Silva" },
  { id: 2, nome: "Bruno Costa" },
  { id: 3, nome: "Carla Souza" },
  { id: 4, nome: "Diego Martins" },
  { id: 5, nome: "Eduarda Lima" },
  { id: 6, nome: "Felipe Rocha" },
  { id: 7, nome: "Gabriela Nunes" },
  { id: 8, nome: "Henrique Alves" },
  { id: 9, nome: "Isabela Torres" },
  { id: 10, nome: "João Pedro" },
  { id: 11, nome: "Karina Mendes" },
  { id: 12, nome: "Lucas Ribeiro" },
  { id: 13, nome: "Mariana Duarte" },
  { id: 14, nome: "Natália Freitas" },
  { id: 15, nome: "Otávio Pinto" },
  { id: 16, nome: "Paula Ferreira" },
  { id: 17, nome: "Ricardo Lima" },
  { id: 18, nome: "Sabrina Teixeira" },
  { id: 19, nome: "Tiago Barros" },
  { id: 20, nome: "Vanessa Monteiro" },
];

export default function NovaDividaView(){
    return (
    <div className={styles.container}>
        <h1>Criar Divida</h1>  
        <FormDivida clientes={clientes} />
    </div>
    )
}