import Login from "./pages/components/login";
import MainSuperAdmin from "./pages/mainSuperAdmin";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainAdmin from "./pages/mainAdmin";
import MainStudent from "./pages/mainStudent";
import Inicio from "./pages/components/inicio";
import InicioStudent from "./pages/components/inicioStudent";
import InicioAdmin from "./pages/components/inicioAdmin";
import PreguntaForm from "./pages/components/form";
import Usuarios from "./pages/components/usuarios";
import PreguntaFormAdmin from "./pages/components/formAdmin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes basename="/">
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainSuperAdmin />} />
          <Route path="/mainAdmin" element={<MainAdmin />} />
          <Route path="/mainStudent" element={<MainStudent />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/inicioStudent" element={<InicioStudent />} />
          <Route path="/inicioAdmin" element={<InicioAdmin />} />
          <Route path="/preguntaForm" element={<PreguntaForm />} />
          <Route path="/preguntaFormAdmin" element={<PreguntaFormAdmin />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
