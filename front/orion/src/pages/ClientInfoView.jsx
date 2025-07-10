import DividaClientCardComponent from "../components/DividaClientCardComponent"
import styles from "./Dividas.module.css"
import { useParams } from "react-router-dom";
import { getClientId } from "../services/clienteService";
import { useEffect, useState } from "react";
import { getDividaId, salvarDivida } from "../services/dividaService";
import FormDividaUpdate from "../components/forms/formDividaUpdate"

export default function ClientInfoView() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDivida, setSelectedDivida] = useState(null);
    const { clientId } = useParams();
    const [client, setClient] = useState(null);
    const [message, setMessage] = useState("");

    async function toggleDivida(dividaId) {
        let response = await getDividaId(dividaId);
        let dividaDb = response.data;

        const dividaUpdate = {
            id: dividaDb.id,
            valor: dividaDb.valor,
            situacao: dividaDb.situacao === 1 ? 0 : 1,
            dataPagamento: dividaDb.dataPagamento ? null : new Date().toISOString(),
            descricao: dividaDb.descricao,
            clienteId: clientId
        };

        response = await salvarDivida(dividaUpdate);

        if (response.status === 200) {
            setMessage("Dívida atualizada com sucesso!");

            const updatedClient = await getClientId(clientId);
            if (updatedClient.status === 200) {
                setClient(updatedClient.data);
            }
        } 
        else if (response.status === 422) {
            setMessage(`Erro ao atualizar a dívida, detalhes: ${response.data[0].mensagem} `);
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        const divida = {
            id: Number(formData.get("id")),
            valor: Number(formData.get("valor")),
            situacao: Number(formData.get("situacao")),
            DataPagamento: formData.get("dataPagamento") ? new Date(formData.get("dataPagamento")) : null,
            descricao: formData.get("descricao"),
            ClienteId: clientId
        }
        
        const response = await salvarDivida(divida)

        if (response.status === 200) {
            setMessage("Dívida atualizada com sucesso!");
            setShowModal(false)
            const updatedClient = await getClientId(clientId);
            if (updatedClient.status === 200) {
                setClient(updatedClient.data);
            }
        } 
        else if (response.status === 422) {
            setMessage(`Erro ao atualizar a dívida, detalhes: ${response.data[0].mensagem} `);
        }
    }

    useEffect(() => {
        getClientId(clientId).then(response => {
            if (response.status === 200) {
                setClient(response.data);
            }
        });
    }, [clientId]);

    return (
        <>
            <div className={styles.divida_header}>
                <h1>Cliente: <span>{client ? client.nome : ""}</span></h1>
            </div>
            {message && (
                <div className={styles.message}>
                    <p>{message}</p>
                </div>
            )}

            <div className={styles.divida_container}>
                {!client ? (
                    <h2>Carregando cliente...</h2>
                ) : client.dividas.length > 0 ? (
                    client.dividas.map((divida) => (
                        <DividaClientCardComponent key={divida.id} divida={divida}
                            onEditar={() => {setSelectedDivida(divida) ; setShowModal(true)}}
                            onToggle={() => toggleDivida(divida.id)}
                        />
                    ))
                ) : (
                    <h2>Não há dívidas registradas para este cliente.</h2>
                )}
            </div>

            {client && (
                <div className={styles.divida_footer}>
                    <h3>Total das dívidas:</h3>
                    <span>
                        {client.dividas.reduce((total, divida) => total + divida.valor,0).toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}
                    </span>
                </div>
            )}
            
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <FormDividaUpdate divida={selectedDivida} 
                        handleSubmit={submitForm}
                        onClose={() => setShowModal(false)}/>
                    </div>
                </div>
            )}
        </>
    );
}
