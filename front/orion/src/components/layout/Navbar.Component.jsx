import logo from "../../assets/logo2.png"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import { GoSearch } from "react-icons/go";
export default function NavbarComponent(){
    return(
        <>
        <nav className={styles.navbar}>
            <div>
                <Link to="/">
                    <img src={logo} alt="Orion" />
                </Link>
            </div>
            <div className={styles.items}>
                <ul>
                    <li>
                        <Link to="/">Pagina Inicial</Link>
                    </li>
                    <li>
                        <Link to="/clientes">Clientes</Link>
                    </li>
                    <li>
                        <Link to="/dividas">Dividas</Link>
                    </li>
                </ul>
                <input type="text" placeholder="Buscar cliente..."/>
                <GoSearch/>
            </div>
        </nav>
        </>
    )
}