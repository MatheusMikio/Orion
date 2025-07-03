import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavbarComponent from "./components/layout/NavbarComponent"
import Container from "./components/layout/Container"
import FooterComponent from "./components/layout/FooterComponent"
import HomeView from "./pages/HomeView"
import ClientesView from "./pages/ClientesView"
import DividasView from "./pages/DividasView"
export default function App() {
  return (
      <Router>
        <NavbarComponent/>
          <Container customClass='min-height'>
            <Routes>
              <Route
                path='/'
                element={<HomeView/>}
              />
              <Route
                path='/clientes'
                element={<ClientesView/>}
              />
        
              <Route
                path='/dividas'
                element={<DividasView/>}
              />
            </Routes>
          </Container>
          <FooterComponent/>
        </Router>

  )
}

