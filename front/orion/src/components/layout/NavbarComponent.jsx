import logo from "../../assets/logo1.png";
import { GoSearch } from "react-icons/go";
import styles from "./Navbar.module.css"
import Container from "./Container";
import { Link } from "react-router-dom";
export default function NavbarComponent() {
  return (
  <nav className={styles.navbar}>
    <Container>
      <Link to="/">
        <img src={logo} alt="Logo da Orion"/>
      </Link>
      <ul>
        <li>
          <Link to="/">
            Pagina Inicial
          </Link>
        </li>
        <li>
          <Link to="/clientes">
            Clientes
          </Link>
        </li>
        <li>
          <Link to="/dividas">
            Dividas
          </Link>
        </li>
        <li className={styles.search}>
          <input type="text" placeholder="Buscar cliente..."/>
          <GoSearch/>
        </li>
      </ul>
    </Container>
  </nav>
  );
}
