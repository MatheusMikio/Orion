import styles from "./Paginacao.module.css"

export default function PaginacaoComponent({handleAnterior, pagina, handleProximo, temMaisPaginas}){
    return(
        <div className={styles.paginacao}>
            <button onClick={handleAnterior} disabled={pagina === 1}>
                Anterior
            </button>
            <span>Página{pagina}</span>
            <button onClick={handleProximo} disabled={!temMaisPaginas}>
                Próximo
            </button>
        </div>
    )
}