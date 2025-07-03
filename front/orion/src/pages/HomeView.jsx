import styles from "./Home.module.css"
import LinkButton from "../components/layout/LinkButton"

export default function HomeView(){
    return(
        <section className={styles.home_container}>
            <h1>Bem - vindo ao <span>Orion</span></h1>
            <p>Comece a gerenciar as dividas dos seu clientes</p>
            <LinkButton to="/newclient" text="Criar Cliente"/>
        </section>
    )
}