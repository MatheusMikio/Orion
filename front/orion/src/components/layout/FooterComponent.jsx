import styles from "./Footer.module.css"
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function FooterComponent(){
    return(
        <footer className={styles.footer}>
            <ul>
                <li><a href="https://github.com/MatheusMikio" target="_blank"><FaGithub/></a></li>
                <li><a href="https://www.linkedin.com/in/matheus-mikio-7a79a2193/" target="_blank"><FaLinkedin/></a></li>
            </ul>
            <p>&copy;2025 <span>Orion</span> - Todos os direitos reservados</p>
        </footer>
    )
}