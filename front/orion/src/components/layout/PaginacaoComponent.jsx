import styles from "./Paginacao.module.css"
import ButtonComponent from "./ButtonComponent"

export default function PaginacaoComponent({handleAnterior, pagina, handleProximo, temMaisPaginas}){
    return(
        <div className={styles.paginacao}>
            <ButtonComponent text="Anterior" onClick={handleAnterior} disabled={pagina === 1}/>
            <span>Página{pagina}</span>
            <ButtonComponent text="Proximo" onClick={handleProximo} disabled={!temMaisPaginas}/>
        </div>
    )
}