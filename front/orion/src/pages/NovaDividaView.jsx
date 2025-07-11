import { useState, useEffect } from "react";
import FormDivida from "../components/forms/FormDivida";
import styles from "./NewClient.module.css"
import { getAllClients } from "../services/clienteService";
import { salvarDivida } from "../services/dividaService";
import { useNavigate } from "react-router-dom";


export default function NovaDividaView(){

  const navigate = useNavigate();
  const [erros, setErros] = useState([])
  const [clients, setClients] = useState([]);

  const fetchData = async () =>{
    const response = await getAllClients();
    if (response.status === 200) setClients(response.data);
  }

  useEffect(() => {
  const fetchData = async () => {
    const response = await getAllClients();
    if (response.status === 200) setClients(response.data);
  };

  fetchData();
}, []);


  const submitForm = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const divida = {
      valor: Number(formData.get("valor")),
      situacao: Number(formData.get("situacao")),
      DataPagamento: formData.get("dataPagamento") ? new Date(formData.get("dataPagamento")) : null,
      descricao: formData.get("descricao"),
      ClienteId: Number(formData.get("clienteId"))
    }

    const response = await salvarDivida(divida)

    if (response.status === 201) navigate("/dividas")
    
    else{
      if (response.status == 422) setErros(response.data)
    }
    
  }

  return (
    <div className={styles.container}>
        <h1>Criar Divida</h1>  
        <FormDivida clientes={clients} handleSubmit={submitForm}/>
    </div>
    )
}