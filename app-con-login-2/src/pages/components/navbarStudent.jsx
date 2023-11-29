import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

const NavbarStudent = ({ Username }) => {
  const handleLogOut = () => {
    //borra los datos del local storage cuando se cierra sesion
    localStorage.clear();
  };

  return (
    <div className="app">
      <header className="flex flex-row w-screen bg-blue-800 p-5">
        <div className="menum w-1/2 flex space-x-4 text-white">
          <div className="mt-2">
            <Link id="inicio" to={"/inicioStudent"} className="hover:underline bg-white text-blue-800 rounded-full px-4 py-2">
              Inicio
            </Link>
          </div>
          <div className="mt-2">
            <Link to={"/"} onClick={handleLogOut} className="hover:underline bg-white text-blue-800 rounded-full px-4 py-2">
              Cerrar Sesion
            </Link>
          </div>
        </div>
        <div className="flex w-1/2 justify-end items-center  text-gray-50">
          <h2>{Username}</h2>
        </div>
      </header>
    </div>
  );
};

NavbarStudent.propTypes = {
  Username: PropTypes.string,
};
export default NavbarStudent;
