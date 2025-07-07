import styles from "./Form.module.css"
import Input from "./Input"


export default function FormDivida({handleSubmit, clientes}){
    return(
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <Input type="number" placeholder="R$200,00" text="Valor:" name="valor"/>
            <div className={styles.select}>
                <label htmlFor="situacao">Situacao:</label>
                <select name="situacao" id="situacao">
                    <option value="0">Pendente</option>
                    <option value="1">Pago</option>
                </select>
            </div>
            <Input type="date" text="Data de pagamento:" name="dataPagamento"/>
            <Input type="text" placeholder="Descrição da divida" text="Descrição:" name="descricao" />
            <div className={styles.select}>
                <label htmlFor="cliente">Cliente:</label>
                <select name="cliente" id="cliente">
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>
            </div>  
            <Input type="submit" value="Criar"/>  
        </form>
    )
}