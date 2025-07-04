import LinkButton from "../components/layout/LinkButton"
import styles from "./Home.module.css"

export default function HomeView(){
    return(
        <div className={styles.home_container}>
            <h1>Bem - vindo ao <span>Orion</span></h1>
            <p>Gerencie as dívidas dos seus clientes.</p>
            <LinkButton to="/newclient" text="Criar Cliente"/>
        </div>
    )
}