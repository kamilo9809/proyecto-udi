import { Link } from "react-router-dom";
import { PropTypes } from 'prop-types'


const NavbarSA = ({ Username }) => {

  const handleLogOut = ()=>{
    //borra los datos del local storage cuando se cierra sesion
    localStorage.clear()
  }

  return (
    <div className="app">
      <header className="bg-blue-800 p-5 flex flex-row">
        <div className="menu flex space-x-4 text-white w-1/2">
          <div className="mt-2">
            <Link id="inicio" to={"/inicioAdmin"} className="hover:underline bg-white text-blue-800 rounded-full px-4 py-2">
              Inicio
            </Link>
          </div>
          <div className="mt-2">
            <Link id="form" to={"/PreguntaFormAdmin"} className="hover:underline bg-white text-blue-800 rounded-full px-4 py-2">
              formulario
            </Link>
          </div>
          <div className="mt-2">
            <Link to={"/"} onClick={handleLogOut} className="hover:underline bg-white text-blue-800 rounded-full px-4 py-2">
              Cerrar Sesión
            </Link>
          </div>
        </div>
        <div className="flex justify-end w-1/2 text-gray-50">
          <h2>{Username}</h2>
        </div>
      </header>
    </div>
  );
};

NavbarSA.propTypes={
  Username:PropTypes.string
}

export default NavbarSA;
