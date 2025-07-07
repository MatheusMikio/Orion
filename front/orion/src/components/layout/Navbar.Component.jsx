import logo from "../../assets/logo2.png"
import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"
import { GoSearch } from "react-icons/go";


export default function NavbarComponent() {
  const { pathname } = useLocation();
  const onClientes = pathname.startsWith("/clientes");
  const onDividas  = pathname.startsWith("/dividas");

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/">
          <img src={logo} alt="Orion" />
        </Link>
      </div>

      <div className={styles.items}>
        <ul>
          <li><Link to="/">Página Inicial</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/dividas">Dívidas</Link></li>
          {onClientes &&(
            <>
            <li>
              <Link to="/novocliente" className={styles.createLink}>
                Criar Cliente
              </Link>
            </li>
            <input type="text" placeholder="Buscar cliente..." />
            <GoSearch />
            </>
          )}
          {onDividas && (
            <li>
              <Link to="/novadivida" className={styles.createLink}>
                Criar Dívida
              </Link>
            </li>
          )}
        </ul>
        
      </div>
    </nav>
  );
}