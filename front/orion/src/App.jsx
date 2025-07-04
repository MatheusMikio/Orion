import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomeView from "./pages/HomeView"
import ClientesView from "./pages/ClientesView"
import DividasView from "./pages/DividasView"
import NavbarComponent from "./components/layout/Navbar.Component"
import NewClientView from "./pages/NewClientView"
import Container from "./components/layout/Container"
import FooterComponent from "./components/layout/FooterComponent"

export default function App() {
  return (
    <Router>
      <NavbarComponent/>
      <Container>
        <Routes>
          <Route path="/" element={<HomeView/>}/>
          <Route path="/clientes" element={<ClientesView/>}/>
          <Route path="/dividas" element={<DividasView/>}/>
          <Route path="/newclient" element={<NewClientView/>}/>
        </Routes>
      </Container>
      <FooterComponent/>
    </Router>
  )
}

