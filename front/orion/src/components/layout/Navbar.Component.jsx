import logo from "../../assets/logo.png"
import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"
import { GoSearch } from "react-icons/go";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export default function NavbarComponent() {
  const { pathname } = useLocation();
  const onClientes = pathname === "/clientes" || pathname === "/clientes/";
  const onDividas  = pathname.startsWith("/dividas");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!onClientes) return;

    const timeout = setTimeout(() => {
      if (search.trim()) {
        navigate(`/clientes?search=${search}`);
      } 
      else {
        navigate('/clientes');
      }
    }, 1000);
  return () => clearTimeout(timeout);
}, [search, navigate, onClientes]);


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
            <input type="search" placeholder="Buscar cliente..." value={search} onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (search.trim()) {
                  navigate(`/clientes?search=${search}`);
                } else {
                  navigate('/clientes');
                }
              }
              }
            }
            />
            <GoSearch onClick={() => {
            if (search.trim()) {
              navigate(`/clientes?search=${search}`);
            } 
            else {
              navigate('/clientes');
            }
          }} />
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